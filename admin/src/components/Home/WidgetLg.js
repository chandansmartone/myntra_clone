import { useEffect, useState } from "react";
import moment from "moment";
import { Axios } from "../../requestMethods";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await Axios.get("order", { params: { l: 5 } });
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);
  
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer Name</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          {orders.map((order) => (
            <tr className="widgetLgTr" key={order._id}>
              <td className="widgetLgUser">
                <span className="widgetLgName">
                  {order.user?.name || "Deleted User"}
                </span>
              </td>
              <td className="widgetLgDate">
                {moment(order.createdAt).fromNow()}
              </td>
              <td className="widgetLgAmount">₹{order.amount}</td>
              <td className="widgetLgStatus">
                <button className={`widgetLgButton ${order.status}` } >
                  {order.status}
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
