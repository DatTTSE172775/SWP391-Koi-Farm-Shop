// ShippedOrders.jsx
import React from "react";
import OrderList from "../../../../components/staff/order/list/OrderList";

const initialOrders = [
  {
    id: "ORD001",
    status: "Shipped",
    createdAt: "2023-10-10",
    total: 500000,
    customerName: "Nguyễn Văn A",
    phoneNumber: "0123456789",
    address: "123 Đường ABC, Quận 1, TP.HCM",
  },
  {
    id: "ORD002",
    status: "Shipped",
    createdAt: "2023-10-12",
    total: 1500000,
    customerName: "Trần Thị B",
    phoneNumber: "0987654321",
    address: "456 Đường XYZ, Quận 2, TP.HCM",
  },
];

const ShippedOrders = () => {
  return <OrderList initialOrders={initialOrders} filterStatus="Shipped" />;
};

export default ShippedOrders;
