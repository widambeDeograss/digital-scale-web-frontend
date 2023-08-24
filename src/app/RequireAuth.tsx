import React from "react";
import { Navigate,Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./AuthSlice";

type BoxProps = {
    children: React.ReactNode; // 👈️ type children
  };

function RequireAuth(props:BoxProps) {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();

    console.log(token);
  return (
    token
    ? <Outlet/>
    : <Navigate to="/actsAdimin/login"  />
  )
}

export default RequireAuth