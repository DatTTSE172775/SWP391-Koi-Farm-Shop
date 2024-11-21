import React, {useEffect} from "react";
import "./OrderHistoryPage.scss";
import OrderHistoryItem from "../../../components/account/OrderHistoryItem/OrderHistoryItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrdersByCustomer, fetchOrdersByUser} from "../../../store/actions/orderActions";
import {fetchUserByUsername} from "../../../store/actions/accountActions";

const OrderHistoryPage = () => {
    const dispatch = useDispatch();
    const {orders = [], loading, error} = useSelector(state => state.order || {});
    const user = useSelector((state) => state.account.user);

    useEffect(() => {
        const username = localStorage.getItem("username");
        dispatch(fetchUserByUsername(username));
    }, [dispatch]);

    useEffect(() => {
        if (user && user.CustomerID) {
            dispatch(fetchOrdersByCustomer(user.CustomerID));
        }
    }, [dispatch, user]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="order-history-page">
            <h2>Lịch sử đơn hàng</h2>
            <div className="order-list">
                {orders.map((order) => (
                    <OrderHistoryItem key={order.OrderID} order={order}/>
                ))}
            </div>
        </div>
    );
};

export default OrderHistoryPage;
