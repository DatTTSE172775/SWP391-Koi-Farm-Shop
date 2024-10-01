// src/layouts/MainLayout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navigation from "../components/navigation/Navigation";

const MainLayout = () => {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
