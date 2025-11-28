const request = require('supertest');
const app = require('../../app');

describe('Restaurant Controller', () => {
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

  test('should create a new restaurant', async () => {
    const response = await request(app)
      .post('/api/v1/restaurants')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Tasty Bites',
        address: '123 Main Street, City',
        contact: '9876543210',
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe('Tasty Bites');
  });

  test('should fail to create a restaurant without authorization', async () => {
    const response = await request(app)
      .post('/api/v1/restaurants')
      .send({
        name: 'Tasty Bites',
        address: '123 Main Street, City',
        contact: '9876543210',
      });

    expect(response.status).toBe(401);  // Unauthorized
    expect(response.body.message).toBe('Token missing or invalid');
  });
});
