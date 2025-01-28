import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Axios } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { loginFailure } from "../../redux/userRedux";

export default function FeaturedInfo() {
  const dispatch = useDispatch();
  const [income, setIncome] = useState([]);
  const [totalProducts, setTotalProduct] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [perc, setPerc] = useState(0);
  const formatter = Intl.NumberFormat("en-IN");

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await Axios.get("/order/income");
        const product = await Axios.get("/product/admin/total");
        const users = await Axios.get("/admin/users/total");
        console.log(product.data);
        setTotalProduct(product.data);
        setTotalUsers(users.data);
        setIncome(res.data.income);
        console.log(res.data);
        setPerc(
          ((res.data.income[0].total - res.data.income[1].total) /
            res.data.income[1].total) *
            100
        );
        
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          dispatch(loginFailure(err.response?.data));
        }
      }
    };
    getIncome();
  }, [dispatch]);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            ₹{formatter.format(income[0]?.total)}
          </span>
          <span className="featuredMoneyRate">
            %{Math.abs(Math.floor(perc))}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Products</span>
        <span className="featuredMoneyContainer">{" "}</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {totalProducts}
          </span>
          <span className="featuredMoneyRate">
            {/* -1.4 <ArrowDownward className="featuredIcon negative" /> */}
          </span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Users</span>
        <span className="featuredMoneyContainer">{"  "}</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{formatter.format(totalUsers)}</span>
          <span className="featuredMoneyRate">
            {/* -1.4 <ArrowDownward className="featuredIcon negative" /> */}
          </span>
        </div>
      </div>
    </div>
  );
}
