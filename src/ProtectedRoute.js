import React from "react";

import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const auth = localStorage.getItem("token") !== null;

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
