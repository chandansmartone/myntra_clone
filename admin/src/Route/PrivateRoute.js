import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar/Sidebar";

const PrivateRoute = () => {
  const admin = useSelector((state) => state.user.isAuthenticated);

  return admin ? (
    <div className="container">
        <Sidebar />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
