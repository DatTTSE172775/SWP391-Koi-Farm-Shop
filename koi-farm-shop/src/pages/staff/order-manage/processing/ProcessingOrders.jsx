import { Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderList from "../../../../components/staff/order/list/OrderList";
import { fetchOrdersByUser } from "../../../../store/actions/orderActions";

const OrderProcessing = () => {
  const dispatch = useDispatch();

  // Đảm bảo state orders được lấy đúng từ store
  const {
    orders = [],
    loading,
    error,
  } = useSelector((state) => state.order || {});

  useEffect(() => {
    const userId = 3; // ID của nhân viên
    dispatch(fetchOrdersByUser(userId));
  }, [dispatch]);

  console.log("Fetched Orders:", orders); // Kiểm tra dữ liệu lấy từ store

  if (loading) return <Spin tip="Loading orders..." />;
  if (error) return <div>Error: {error}</div>;

  // Lọc các đơn hàng có trạng thái Processing
  const processingOrders = orders.filter(
    (order) => order.OrderStatus && order.OrderStatus === "Processing"
  );
  console.log("Filtered Processing Orders:", processingOrders); // Kiểm tra danh sách đơn hàng

  return (
    <OrderList initialOrders={processingOrders} filterStatus="Processing" />
  );
};

export default OrderProcessing;
