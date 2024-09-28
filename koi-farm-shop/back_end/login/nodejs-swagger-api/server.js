const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Khởi tạo ứng dụng express
const app = express();
app.use(express.json()); // Để xử lý JSON trong request body

// Cấu hình Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', 
        info: {
            title: 'Simple API',
            version: '1.0.0',
            description: 'A simple API for login and register',
        },
        servers: [
            {
                url: 'http://localhost:3000'  // Thay đổi cổng ở đây
            }
        ]
    },
    apis: ['./server.js'], // Chỉ định file nào chứa comment của Swagger
};

// Khởi tạo Swagger Docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Đăng nhập với username và password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: 'testuser'
 *               password:
 *                 type: string
 *                 example: '123456'
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Đăng nhập thành công'
 *       401:
 *         description: Sai tên đăng nhập hoặc mật khẩu
 */

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Kiểm tra đăng nhập cơ bản
    if (username === 'testuser' && password === '123456') {
        res.status(200).json({ message: 'Đăng nhập thành công' });
    } else {
        res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
    }
});

// Khởi động server trên cổng 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
});
