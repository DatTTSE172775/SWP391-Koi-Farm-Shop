import React, { useEffect, useState } from "react";
import { Select } from "antd";

const { Option } = Select;

const OrderStatusFilter = ({ orders, onFilter }) => {
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        // Lấy tất cả trạng thái từ danh sách đơn hàng
        const allStatuses = orders.map((order) => order.OrderStatus);
        // Loại bỏ trùng lặp và sắp xếp
        const uniqueStatuses = Array.from(new Set(allStatuses)).sort((a, b) => {
            const order = ["Pending", "Processing", "Delivering", "Delivered", "Cancelled"];
            return order.indexOf(a) - order.indexOf(b);
        });
        setStatuses(uniqueStatuses);
    }, [orders]);

    const handleStatusChange = (value) => {
        onFilter(value);
    };

    return (
        <Select
            style={{ width: 300 }}
            placeholder="Chọn trạng thái đơn hàng"
            onChange={handleStatusChange}
            allowClear
        >
            <Option value="">Tất cả đơn hàng</Option>
            {statuses.map((status) => (
                <Option key={status} value={status}>
                    {status}
                </Option>
            ))}
        </Select>
    );
};

export default OrderStatusFilter;
