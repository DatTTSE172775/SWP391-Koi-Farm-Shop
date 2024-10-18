const logoutUser = (req, res) => {
    // Phía client sẽ xoá token, vì vậy không cần làm gì thêm ở server
    res.json({ message: 'Logged out successfully' });
};

module.exports = logoutUser;
