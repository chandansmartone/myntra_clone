import Chart from "./Chart";
import FeaturedInfo from "./FeaturedInfo";
import WidgetSm from "./WidgetSm";
import WidgetLg from "./WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { Axios } from "../../requestMethods";
import "./style.css";

export default function Home() {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUNE",
      "JULY",
      "AUG",
      "SEPT",
      "OCT",
      "NOV",
      "DEC",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await Axios.get("/admin/users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className="home page">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="New User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
