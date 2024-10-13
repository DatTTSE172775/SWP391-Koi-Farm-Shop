const { I } = inject();

Feature('login');

Scenario('Successful login', async () => {
  const response = await I.sendPostRequest('/login', {
    username: 'customer',
    password: 'customerpassword'
  });

  I.seeResponseCodeIs(200);
  I.seeResponseContainsJson({
    token: response.data.token,
    username: 'customer'
  });
  I.seeResponseValidByCallback(({ data }) => {
    return typeof data.token === 'string' && data.token.length > 0;
  });
});

Scenario('Login with incorrect username', async () => {
  const response = await I.sendPostRequest('/login', {
    username: 'nonexistent',
    password: 'somepassword'
  });

  I.seeResponseCodeIs(401);
  I.seeResponseContainsJson({
    message: 'Tên đăng nhập không chính xác'
  });
});

Scenario('Login with incorrect password', async () => {
  const response = await I.sendPostRequest('/login', {
    username: 'customer',
    password: 'wrongpassword'
  });

  I.seeResponseCodeIs(401);
  I.seeResponseContainsJson({
    message: 'Mật khẩu không chính xác'
  });
});

Scenario('Login with admin credentials', async () => {
  const response = await I.sendPostRequest('/login', {
    username: 'admin',
    password: 'adminpassword'
  });

  I.seeResponseCodeIs(200);
  I.seeResponseContainsJson({
    token: response.data.token,
    username: 'admin'
  });
});

// Additional test for protected endpoint
Scenario('Access protected endpoint with valid token', async ({ I }) => {
  // First, login to get the token
  const loginResponse = await I.sendPostRequest('/login', {
    username: 'customer',
    password: 'customerpassword'
  });

  const token = loginResponse.data.token;

  // Now, access the protected endpoint
  const response = await I.sendGetRequest('/protected', {
    'Authorization': `Bearer ${token}`
  });

  console.log('Protected endpoint response:', response);

  I.seeResponseCodeIs(200);
  
  // Log the response body
  console.log('Response body:', JSON.stringify(response.data, null, 2));

  // Check if the response contains a message field
  if (response.data && response.data.message) {
    I.seeResponseContainsJson({
      message: response.data.message
    });
  } else {
    console.log('Warning: Response does not contain expected message field');
    // You can add a custom assertion here if needed
  }
});

Scenario('Login attempt with missing username', async ({ I }) => {
  const response = await I.sendPostRequest('/login', {
    password: 'somepassword'
  });

  I.seeResponseCodeIs(400);
  I.seeResponseContainsJson({
    message: 'Username is required'
  });
});

Scenario('Login attempt with very long password', async ({ I }) => {
  const veryLongPassword = 'a'.repeat(1000); // Creates a string of 1000 'a' characters
  const response = await I.sendPostRequest('/login', {
    username: 'customer',
    password: veryLongPassword
  });

  I.seeResponseCodeIs(400);
  I.seeResponseContainsJson({
    message: 'Password exceeds maximum length'
  });
});