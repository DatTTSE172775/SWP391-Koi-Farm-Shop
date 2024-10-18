const Customer = require('../models/customerModel');

// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
    const { customerId } = req.params;

    try {
        const customer = await Customer.getCustomerById(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found.' });
        }
        res.json(customer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Add this new function
const getCustomerByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const customer = await Customer.getCustomerByEmail(email);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found.' });
        }
        res.json(customer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = { getAllCustomers, getCustomerById, getCustomerByEmail };
