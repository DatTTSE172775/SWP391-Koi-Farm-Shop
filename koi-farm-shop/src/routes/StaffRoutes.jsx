// src/routes/staffRoutes.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import StaffLayout from "../layout/staff/StaffLayout";
import WelcomeStaff from "../pages/staff/layout/WelcomeStaff";
import StaffOrderManage from "../pages/staff/order-manage/StaffOrderManage";
import CancelledOrders from "../pages/staff/order-manage/cancelled/CancelledOrders";
import DeliveredOrders from "../pages/staff/order-manage/completed/CompletedOrders";
import ProcessingOrders from "../pages/staff/order-manage/processing/ProcessingOrders";
import ShippingOrders from "../pages/staff/order-manage/shipping/ShippingOrders";
import PendingConsignments from "../pages/staff/consignment-manage/processing/ProcessingConsignment";
import InCareConsignments from "../pages/staff/consignment-manage/completed/CompletedConsignment";
import StaffConsignmentDetails from "../pages/staff/consignment-manage/consignmentDetails/staffConsignmentDetails";
import RejectedConsignments from "../pages/staff/consignment-manage/rejected/RejectedConsignment";
import OrderDetailsStaff from "../pages/staff/OrderDetails/OrderDetailsStaff";

const ProtectedStaffRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  if (role !== "Staff") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const staffRoutes = (
  <Route
    path="/staff"
    element={
      <ProtectedStaffRoute>
        <StaffLayout />
      </ProtectedStaffRoute>
    }
  >
    <Route index element={<WelcomeStaff />} />

    <Route path="orders" element={<StaffOrderManage />}>
      <Route path="processing" element={<ProcessingOrders />} />
      <Route path="shipping" element={<ShippingOrders />} />
      <Route path="deliveried" element={<DeliveredOrders />} />
      <Route path="cancelled" element={<CancelledOrders />} />
      <Route path="order-details/:OrderID" element={<OrderDetailsStaff />} />
    </Route>

    <Route path="consignments">
      <Route path="pending" element={<PendingConsignments />} />
      <Route path="in-care" element={<InCareConsignments />} />
      <Route path="rejected" element={<RejectedConsignments />}/>
      <Route path="detail/:id" element={<StaffConsignmentDetails />} />
    </Route>
  </Route>
);

export default staffRoutes;
