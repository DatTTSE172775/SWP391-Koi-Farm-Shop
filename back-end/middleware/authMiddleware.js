const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure you have a .env file with a secret key

// Middleware function to verify JWT token
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Assuming Bearer Token

    if (!token) {
        return res.status(401).json({
            message: 'No token provided. Access denied.', 
            error: 'MISSING_TOKEN'
         });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add the user data to the request object
        next();
    } catch (err) {
        // Phân loại lỗi token và trả về thông báo chi tiết hơn
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                message: 'Token expired. Please login again.', 
                error: 'TOKEN_EXPIRED', 
                expiredAt: err.expiredAt 
            });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                message: 'Invalid token. Access denied.', 
                error: 'INVALID_TOKEN' 
            });
        } else {
            return res.status(500).json({ 
                message: 'Failed to authenticate token.', 
                error: err.message 
            });
        }
    }
};

module.exports = authMiddleware;
