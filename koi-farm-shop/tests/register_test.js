const { I } = inject();

Feature('register');

Scenario('Successful registration', async () => {
  const response = await I.sendPostRequest('/register', {
    username: 'customer',
    password: 'customerpassword',
    fullname: 'Customer Name',
    phone: '123456789',
    email: 'customer@example.com'
  });

  I.seeResponseCodeIs(201);
  I.seeResponseContainsJson({
    message: 'Đăng ký thành công'
  });
});

Scenario('Registration with existing username', async () => {
  const response = await I.sendPostRequest('/register', {
    username: 'customer',
    password: 'somepassword',
    fullname: 'Existing User',
    phone: '9876543210',
    email: 'existing@example.com'
  });

  I.seeResponseCodeIs(400);
  I.seeResponseContainsJson({
    message: 'Tên người dùng đã tồn tại'
  });
});

Scenario('Registration with missing information', async () => {
  const response = await I.sendPostRequest('/register', {
    username: 'incompleteuser',
    password: 'somepassword'
    // Missing fullname, phone, and email
  });

  I.seeResponseCodeIs(400);
  I.seeResponseContainsJson({
    message: 'Thiếu thông tin bắt buộc'
  });
});

Scenario('Registration with invalid email', async () => {
  const response = await I.sendPostRequest('/register', {
    username: 'invalidemailuser',
    password: 'somepassword',
    fullname: 'Invalid Email User',
    phone: '1234567890',
    email: 'invalidemail'
  });

  I.seeResponseCodeIs(400);
  I.seeResponseContainsJson({
    message: 'Email không hợp lệ'
  });
});

Scenario('Registration with short password', async () => {
  const response = await I.sendPostRequest('/register', {
    username: 'shortpassworduser',
    password: 'short',
    fullname: 'Short Password User',
    phone: '1234567890',
    email: 'shortpassword@example.com'
  });

  I.seeResponseCodeIs(400);
  I.seeResponseContainsJson({
    message: 'Mật khẩu phải có ít nhất 6 ký tự'
  });
});
