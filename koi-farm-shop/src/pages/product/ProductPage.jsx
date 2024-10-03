import React from "react";
import { Outlet } from "react-router-dom";

const ProductPage = () => {
  return (
    <div className="product-page">
      <Outlet />
    </div>
  );
};
export default ProductPage;
