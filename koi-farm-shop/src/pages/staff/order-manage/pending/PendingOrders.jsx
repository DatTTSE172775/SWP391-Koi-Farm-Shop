// OrderPending.jsx
import React from "react";
import OrderList from "../../../../components/staff/order/list/OrderList";
import "./OrderPending.scss";

const ordersData = [
  {
    id: "ORD001",
    createdAt: "2023-10-10",
    total: 500000,
    customerName: "Nguyễn Văn A",
    phoneNumber: "0123456789",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    status: "Pending",
  },
  {
    id: "ORD002",
    createdAt: "2023-10-12",
    total: 1500000,
    customerName: "Trần Thị B",
    phoneNumber: "0987654321",
    address: "456 Đường XYZ, Quận 2, TP.HCM",
    status: "Pending",
  },
  {
    id: "ORD003",
    createdAt: "2023-10-12",
    total: 1500000,
    customerName: "Trần Thị B",
    phoneNumber: "0987654321",
    address: "161/31, Le Tan Be, An Lac, Binh Tan, TP.HCM",
    status: "Pending",
  },
  {
    id: "ORD004",
    createdAt: "2023-10-12",
    total: 1500000,
    customerName: "Trần Thị B",
    phoneNumber: "0987654321",
    address: "456 Đường XYZ, Quận 2, TP.HCM",
    status: "Pending",
  },
];
const OrderPending = () => {
  return <OrderList initialOrders={ordersData} />;
};

export default OrderPending;
