import React from "react";
import OrderList from "../../../../components/staff/order/list/OrderList";

const initialOrders = [
  {
    id: "ORD004",
    status: "Cancelled",
    createdAt: "2023-10-18",
    total: 800000,
    customerName: "Lê Thị D",
    phoneNumber: "0981122334",
    address: "123 Đường GHI, Quận 4, TP.HCM",
  },
  {
    id: "ORD004",
    status: "Cancelled",
    createdAt: "2023-10-18",
    total: 800000,
    customerName: "Lê Thị D",
    phoneNumber: "0981122334",
    address: "123 Đường GHI, Quận 4, TP.HCM",
  },
  {
    id: "ORD004",
    status: "Cancelled",
    createdAt: "2023-10-18",
    total: 800000,
    customerName: "Lê Thị D",
    phoneNumber: "0981122334",
    address: "123 Đường GHI, Quận 4, TP.HCM",
  },
];

const CancelledOrders = () => {
  return <OrderList initialOrders={initialOrders} filterStatus="Cancelled" />;
};

export default CancelledOrders;
