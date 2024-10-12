exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Logic đăng ký người dùng
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Logic đăng nhập người dùng
    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log in user' });
  }
};
