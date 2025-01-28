import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonLoader from "../Loader/ButtonLoader";
import { toast } from "react-toastify";
import { Axios } from "../../requestMethods";
import "../User/style.css";

const Order = () => {
  const navigate = useNavigate();

  const [order, setOrder] = useState({});

  // for update api
  const [loading, setLoading] = useState(null);

  const { orderId } = useParams();

  // submit handler
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const updateUser = async () => {
      setLoading(true);
      try {
        await Axios.put(`order/${orderId}`, order);
        setLoading(false);
        toast.success("Order Updated Successfully.");
        navigate("/orders");
      } catch (err) {
        toast.error(err.response?.data?.message);
        setLoading(false);
      }
    };
    updateUser();
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await Axios.get(`order/${orderId}`);
        setOrder(data.order);
      } catch (err) {}
    };
    fetchOrder();
  }, [orderId]);

  return (
    <>
      <div className="newProductContainer">
        <form className="createProductForm" onSubmit={updateOrderSubmitHandler}>
          <h1>Update Order</h1>

          <div>
            <input
              type="text"
              placeholder="Order ID"
              value={order?._id}
              readOnly
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Ordered By"
              required
              value={order?.user?.name}
              readOnly
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Amount"
              required
              value={`₹${order?.amount}`}
              readOnly
            />
          </div>

          <div>
            <select
              name="status"
              value={order?.status}
              onChange={(e) =>
                setOrder({ ...order, [e.target.name]: e.target.value })
              }
            >
              <option value="ordered">Ordered</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          <button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false || order?.status === "" ? true : false}
          >
            {loading && <ButtonLoader />} Update
          </button>
        </form>
      </div>
    </>
  );
};

export default Order;
