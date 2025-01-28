import { useEffect, useState } from "react";
import { Axios } from "../../requestMethods";
import moment from "moment";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await Axios.get("/admin/users", { params: { l: 6 } });
        setUsers(res.data.users);
      } catch {}
    };
    getUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Users</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.email}</span>
            </div>
            <button className="widgetSmButton">
              {moment(user.createdAt).fromNow()}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
