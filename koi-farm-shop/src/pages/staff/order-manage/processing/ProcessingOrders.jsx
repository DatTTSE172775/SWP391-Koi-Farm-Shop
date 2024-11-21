import { Spin, Empty } from "antd";
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
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      dispatch(fetchOrdersByUser(userId));
    } else {
      console.warn('No user ID found in localStorage');
    }
  }, [dispatch, userId]);

  if (loading) return <Spin tip="Loading orders..." />;
  if (error) return <div>Error: {error}</div>;

  // Lọc các đơn hàng có trạng thái Processing
  const processingOrders = orders.filter(
    (order) => order.OrderStatus && order.OrderStatus === "Processing"
  );
  console.log("Filtered Processing Orders:", processingOrders); // Kiểm tra danh sách đơn hàng

  if (processingOrders.length === 0) {
    return (
      <Empty
        description="Không có đơn hàng đang xử lý"
        className="empty-state"
      />
    );
  }

  return (
    <OrderList initialOrders={processingOrders} filterStatus="Processing" />
  );
};

export default OrderProcessing;
