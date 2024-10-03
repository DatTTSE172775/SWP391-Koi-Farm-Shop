import React from "react";
import { Outlet } from "react-router-dom";
import "./AuthPage.scss";

const AuthPage = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
export default AuthPage;
