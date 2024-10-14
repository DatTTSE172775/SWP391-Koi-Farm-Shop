exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Logic đăng ký người dùng
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra xem người dùng đã nhập username và password chưa
    if (!username || !password) return res.status(400).json({ error: 'Username and password are required!' });

    // Kiểm tra người dùng nhập đúng username và password chưa
    const user = users.find((u) => u.username === username);
    if (!user) return res.status(401).json({ error: 'Invalid username!' });

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Wrong password!' });

    // (Đoạn mã này cần được hoàn thiện thêm logic kiểm tra)
    // if (username !== 'expectedUsername' || password !== 'expectedPassword') {
    //   return res.status(401).json({ error: 'Invalid username or password' });
    // }
    
    // Logic đăng nhập người dùng
    res.status(200).json({ message: 'User logged in successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log in user.' });
  }
};
