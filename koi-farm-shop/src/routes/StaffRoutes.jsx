// src/routes/staffRoutes.js
import React from "react";
import { Route } from "react-router-dom";
import StaffLayout from "../layout/staff/StaffLayout";
import WelcomeStaff from "../pages/staff/layout/WelcomeStaff";
import StaffOrderManage from "../pages/staff/order-manage/StaffOrderManage";
import CancelledOrders from "../pages/staff/order-manage/cancelled/CancelledOrders";
import DeliveredOrders from "../pages/staff/order-manage/completed/CompletedOrders";
import OrderDetail from "../pages/staff/order-manage/details/OrderDetail";
import ProcessingOrders from "../pages/staff/order-manage/processing/ProcessingOrders";
import ShippingOrders from "../pages/staff/order-manage/shipping/ShippingOrders";

const staffRoutes = (
  <Route path="/staff" element={<StaffLayout />}>
    <Route index element={<WelcomeStaff />} />
    <Route path="orders" element={<StaffOrderManage />}>
      <Route path="processing" element={<ProcessingOrders />} />
      <Route path="shipping" element={<ShippingOrders />} />
      <Route path="deliveried" element={<DeliveredOrders />} />
      <Route path="cancelled" element={<CancelledOrders />} />
      <Route path="orders/:id" element={<OrderDetail />} />
    </Route>
  </Route>
);

export default staffRoutes;
