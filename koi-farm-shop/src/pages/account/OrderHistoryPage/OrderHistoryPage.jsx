import React from "react";
import "./OrderHistoryPage.scss";
import OrderHistoryItem from "../../../components/account/OrderHistoryItem/OrderHistoryItem";

const OrderHistoryPage = () => {
    // Mockup data
    const orders = [
        {
            id: "ORD001",
            date: "21/11/2024",
            total: "2,000,000",
            status: "Delivering",
            address: "123 Đường ABC, Quận XYZ, Thành phố HCM",
            products: [
                { name: "Cá Koi Kohaku", quantity: 2, price: "500,000", image: "https://via.placeholder.com/50" },
                { name: "Cá Koi Showa", quantity: 1, price: "1,000,000", image: "https://via.placeholder.com/50" },
            ],
        },
        {
            id: "ORD002",
            date: "20/11/2024",
            total: "1,500,000",
            status: "Delivered",
            address: "456 Đường DEF, Quận GHI, Thành phố HCM",
            products: [
                { name: "Cá Koi Tancho", quantity: 1, price: "1,500,000", image: "https://via.placeholder.com/50" },
            ],
        },
        {
            id: "ORD003",
            date: "19/11/2024",
            total: "3,000,000",
            status: "Processing",
            address: "789 Đường KLM, Quận OPQ, Thành phố HCM",
            products: [
                { name: "Cá Koi Platinum", quantity: 3, price: "1,000,000", image: "https://via.placeholder.com/50" },
            ],
        },
        {
            id: "ORD004",
            date: "18/11/2024",
            total: "500,000",
            status: "Cancelled",
            address: "101 Đường NOP, Quận QRS, Thành phố HCM",
            products: [
                { name: "Cá Koi Shiro", quantity: 1, price: "500,000", image: "https://via.placeholder.com/50" },
            ],
        },
        {
            id: "ORD005",
            date: "17/11/2024",
            total: "1,000,000",
            status: "Pending",
            address: "202 Đường TUV, Quận WXY, Thành phố HCM",
            products: [
                { name: "Cá Koi Gin Rin", quantity: 2, price: "500,000", image: "https://via.placeholder.com/50" },
            ],
        },
    ];



    return (
        <div className="order-history-page">
            <h2>Lịch sử đơn hàng</h2>
            <div className="order-list">
                {orders.map((order) => (
                    <OrderHistoryItem key={order.id} order={order} />
                ))}
            </div>
        </div>
    );
};

export default OrderHistoryPage;
