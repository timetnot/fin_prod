const request = require('supertest');
const app = require('../index');

describe('Auth Endpoints', () => {
  describe('POST /auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };

      const response = await request(app)
        .post('/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.email).toBe(userData.email);
    });

    it('should return error for invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'password123',
        name: 'Test User'
      };

      const response = await request(app)
        .post('/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return error for weak password', async () => {
      const userData = {
        email: 'test@example.com',
        password: '123',
        name: 'Test User'
      };

      const response = await request(app)
        .post('/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.message).toContain('минимум 6 символов');
    });

    it('should return error for duplicate email', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      };

      await request(app)
        .post('/auth/register')
        .send(userData)
        .expect(201);

      const response = await request(app)
        .post('/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.message).toContain('уже существует');
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User'
        });
    });

    it('should login successfully with valid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe(loginData.email);
    });

    it('should return error for invalid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body.message).toContain('Неверные учетные данные');
    });

    it('should return error for non-existent user', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body.message).toContain('Неверные учетные данные');
    });
  });

  describe('Rate Limiting', () => {
    it('should limit login attempts', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      for (let i = 0; i < 11; i++) {
        await request(app)
          .post('/auth/login')
          .send(loginData);
      }

      const response = await request(app)
        .post('/auth/login')
        .send(loginData)
        .expect(429);

      expect(response.body.message).toContain('Слишком много попыток входа');
    });
  });
});
