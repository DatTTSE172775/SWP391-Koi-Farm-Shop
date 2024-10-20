const Customer = require('../models/customerModel');

// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.getAllCustomers();
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

// Get customer by name
const getCustomerByName = async (req, res) => {
    const { fullName } = req.params;
    try {
        const customers = await Customer.getCustomerByName(fullName);
        if (customers.length === 0) {
            return res.status(404).json({ message: 'No customers found with that name.' });
        }
        res.json(customers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

// Get customer by username
const getCustomerByUserName = async (req, res) => {
    const { userName } = req.params;
    try {
        const customer = await Customer.getCustomerByUserName(userName);
        res.json(customer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = { getAllCustomers, getCustomerById, getCustomerByName, getCustomerByUserName };
