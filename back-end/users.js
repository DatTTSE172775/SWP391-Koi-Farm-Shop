const bcrypt = require('bcryptjs');

// Mảng chứa thông tin các user
const users = [
  {
    id: 1,
    username: "customer",
    password: bcrypt.hashSync("customerpassword", 8),
    role: "customer",
  },
  {
    id: 2,
    username: "admin",
    password: bcrypt.hashSync("adminpassword", 8),
    role: "admin",
  },
  {
    id: 3,
    username: "staff",
    password: bcrypt.hashSync("staffpassword", 8),
    role: "staff",
  },
  {
    id: 4,
    username: "jonnytran",
    password: bcrypt.hashSync("123", 8),
    role: "customer",
  },
];

module.exports = users;  // Xuất mảng users để sử dụng ở các file khác