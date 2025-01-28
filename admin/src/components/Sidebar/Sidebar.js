import "./sidebar.css";
import {
  LineStyle,
  Add,
  PermIdentity,
  Storefront,
  AttachMoney,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/apiCalls";
// import logo from "../../assets/logo.png";

export default function Sidebar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="sidebar">
      <h4 className="logo"> Perfect Fit</h4>
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "sidebarListItem link active"
                    : "sidebarListItem link"
                }
              >
                <LineStyle className="sidebarIcon" />
                Home
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive
                    ? "sidebarListItem link active"
                    : "sidebarListItem link"
                }
              >
                <PermIdentity className="sidebarIcon" />
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? "sidebarListItem link active"
                    : "sidebarListItem link"
                }
              >
                <Storefront className="sidebarIcon" />
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/product/add"
                className={({ isActive }) =>
                  isActive
                    ? "sidebarListItem link active"
                    : "sidebarListItem link"
                }
              >
                <Add className="sidebarIcon" />
                Add Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive
                    ? "sidebarListItem link active"
                    : "sidebarListItem link"
                }
              >
                <AttachMoney className="sidebarIcon" />
                Orders
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <ul className="sidebarList">
              <button onClick={handleLogout} className="btn btn-logout">
                LOGOUT
              </button>
          </ul>
        </div>
      </div>
    </div>
  );
}
