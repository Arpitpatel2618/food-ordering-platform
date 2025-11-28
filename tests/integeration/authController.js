const request = require('supertest');
const app = require('../../app');

describe('Auth Controller', () => {
  let adminToken;

  beforeAll(async () => {
    // Register a new admin for testing login
    const registerResponse = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'Admin123',
        role: 'admin',
      });

    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'Admin123',
      });

    adminToken = loginResponse.body.data.accessToken;
  });

  test('should register a new user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Customer User',
        email: 'customer@example.com',
        password: 'Customer123',
        role: 'customer',
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user.email).toBe('customer@example.com');
  });

  test('should login an existing user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'customer@example.com',
        password: 'Customer123',
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.accessToken).toBeDefined();
  });

  test('should fail to login with incorrect credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'customer@example.com',
        password: 'WrongPassword',
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid credentials');
  });
});
