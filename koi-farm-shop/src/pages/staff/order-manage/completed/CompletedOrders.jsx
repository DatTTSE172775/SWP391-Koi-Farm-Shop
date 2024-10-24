import React from "react";
import OrderList from "../../../../components/staff/order/list/OrderList";

const initialOrders = [
  {
    id: "ORD003",
    status: "Delivered",
    createdAt: "2023-10-15",
    total: 1200000,
    customerName: "Phạm Văn C",
    phoneNumber: "0934567890",
    address: "789 Đường DEF, Quận 3, TP.HCM",
  },
  {
    id: "ORD003",
    status: "Delivered",
    createdAt: "2023-10-15",
    total: 1200000,
    customerName: "Phạm Văn C",
    phoneNumber: "0934567890",
    address: "789 Đường DEF, Quận 3, TP.HCM",
  },
  {
    id: "ORD003",
    status: "Delivered",
    createdAt: "2023-10-15",
    total: 1200000,
    customerName: "Phạm Văn C",
    phoneNumber: "0934567890",
    address: "789 Đường DEF, Quận 3, TP.HCM",
  },
];

const DeliveredOrders = () => {
  return <OrderList initialOrders={initialOrders} filterStatus="Delivered" />;
};

export default DeliveredOrders;
