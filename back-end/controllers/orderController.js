const Order = require('../models/orderModel');

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Create a new order
const createOrder = async (req, res) => {
    const { customerID, totalAmount, shippingAddress, paymentMethod } = req.body;

    try {
        const newOrder = await Order.create({
            customerID,
            totalAmount,
            shippingAddress,
            paymentMethod,
            orderDate: new Date(),
            orderStatus: 'Pending'
        });
        res.status(201).json(newOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create order.' });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        order.orderStatus = status;
        await order.save();

        res.json({ message: 'Order status updated.', order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update order status.' });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        await order.destroy();
        res.json({ message: 'Order deleted.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete order.' });
    }
};

module.exports = { getAllOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder };
