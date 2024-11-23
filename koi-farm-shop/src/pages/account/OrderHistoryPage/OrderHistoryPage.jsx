import React, { useEffect, useState } from "react";
import "./OrderHistoryPage.scss";
import OrderHistoryItem from "../../../components/account/OrderHistoryItem/OrderHistoryItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersByCustomer } from "../../../store/actions/orderActions";
import { fetchUserByUsername } from "../../../store/actions/accountActions";
import Loading from "../../../components/loading/Loading";
import { Select, Empty } from "antd";

const { Option } = Select;

const OrderHistoryPage = () => {
    const dispatch = useDispatch();
    const { orders = [], loading, error } = useSelector((state) => state.order || {});
    const user = useSelector((state) => state.account.user);
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        const username = localStorage.getItem("username");
        dispatch(fetchUserByUsername(username));
    }, [dispatch]);

    useEffect(() => {
        if (user && user.CustomerID) {
            dispatch(fetchOrdersByCustomer(user.CustomerID));
        }
    }, [dispatch, user]);

    useEffect(() => {
        setFilteredOrders(orders); // Update filtered orders when orders change
    }, [orders]);

    const handleSearch = (value) => {
        if (value === "all") {
            setFilteredOrders(orders); // Reset to all orders
        } else {
            const statusMap = {
                "Đang xử lý": "Pending",
                "Đang đóng gói": "Processing",
                "Đang vận chuyển": "Delivering",
                "Đã vận chuyển": "Delivered",
                "Đã hủy": "Cancelled",
            };

            const englishStatus = statusMap[value];
            setFilteredOrders(orders.filter((order) => order.OrderStatus === englishStatus));
        }
    };

    if (loading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="order-history-page">
            <h2>Lịch sử đơn hàng</h2>
            <Select
                defaultValue="all"
                style={{ width: 200, marginBottom: "20px" }}
                onChange={handleSearch}
            >
                <Option value="all">Tất cả đơn hàng</Option>
                <Option value="Đang xử lý">Đang xử lý</Option>
                <Option value="Đang đóng gói">Đang đóng gói</Option>
                <Option value="Đang vận chuyển">Đang vận chuyển</Option>
                <Option value="Đã vận chuyển">Đã vận chuyển</Option>
                <Option value="Đã hủy">Đã hủy</Option>
            </Select>
            <div className="order-list">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <OrderHistoryItem key={order.OrderID} order={order} />
                    ))
                ) : (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Không có đơn hàng nào"
                        style={{ marginTop: "20px" }}
                    />
                )}
            </div>
        </div>
    );
};

export default OrderHistoryPage;
