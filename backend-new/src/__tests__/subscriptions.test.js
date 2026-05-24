const request = require('supertest');
const app = require('../index');

describe('Subscriptions Endpoints', () => {
  let authToken;
  let userId;

  beforeEach(async () => {
    const registerResponse = await request(app)
      .post('/auth/register')
      .send({
        email: 'subscription-test@example.com',
        password: 'password123',
        name: 'Test User'
      });

    authToken = registerResponse.body.token;
    userId = registerResponse.body.user.id;
  });

  describe('POST /subscriptions', () => {
    it('should create a new subscription successfully', async () => {
      const subscriptionData = {
        name: 'Netflix',
        category: 'entertainment',
        amount: 15.99,
        currency: 'USD',
        billingCycle: 'monthly',
        nextBillingDate: '2026-05-01'
      };

      const response = await request(app)
        .post('/subscriptions')
        .set('Authorization', 'Bearer ' + authToken)
        .send(subscriptionData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(subscriptionData.name);
      expect(response.body.amount).toBe(subscriptionData.amount);
    });

    it('should return error for invalid data', async () => {
      const invalidData = {
        name: '',
        category: 'entertainment',
        amount: -10,
        currency: 'USD',
        billingCycle: 'monthly'
      };

      const response = await request(app)
        .post('/subscriptions')
        .set('Authorization', 'Bearer ' + authToken)
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should require authentication', async () => {
      const subscriptionData = {
        name: 'Netflix',
        category: 'entertainment',
        amount: 15.99,
        currency: 'USD',
        billingCycle: 'monthly'
      };

      await request(app)
        .post('/subscriptions')
        .send(subscriptionData)
        .expect(401);
    });
  });

  describe('GET /subscriptions', () => {
    beforeEach(async () => {
      await request(app)
        .post('/subscriptions')
        .set('Authorization', 'Bearer ' + authToken)
        .send({
          name: 'Test Subscription 1',
          category: 'software',
          amount: 9.99,
          currency: 'USD',
          billingCycle: 'monthly'
        });

      await request(app)
        .post('/subscriptions')
        .set('Authorization', 'Bearer ' + authToken)
        .send({
          name: 'Test Subscription 2',
          category: 'music',
          amount: 4.99,
          currency: 'USD',
          billingCycle: 'monthly'
        });
    });

    it('should return user subscriptions', async () => {
      const response = await request(app)
        .get('/subscriptions')
        .set('Authorization', 'Bearer ' + authToken)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
    });

    it('should return empty array for user with no subscriptions', async () => {
      const newUserResponse = await request(app)
        .post('/auth/register')
        .send({
          email: 'empty@example.com',
          password: 'password123',
          name: 'Empty User'
        });

      const response = await request(app)
        .get('/subscriptions')
        .set('Authorization', 'Bearer ' + newUserResponse.body.token)
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });

  describe('PUT /subscriptions/:id', () => {
    let subscriptionId;

    beforeEach(async () => {
      const createResponse = await request(app)
        .post('/subscriptions')
        .set('Authorization', 'Bearer ' + authToken)
        .send({
          name: 'Test Subscription',
          category: 'software',
          amount: 9.99,
          currency: 'USD',
          billingCycle: 'monthly'
        });

      subscriptionId = createResponse.body.id;
    });

    it('should update subscription successfully', async () => {
      const updateData = {
        name: 'Updated Netflix',
        amount: 19.99,
        isActive: false
      };

      const response = await request(app)
        .put('/subscriptions/' + subscriptionId)
        .set('Authorization', 'Bearer ' + authToken)
        .send(updateData)
        .expect(200);

      expect(response.body.name).toBe(updateData.name);
      expect(response.body.amount).toBe(updateData.amount);
      expect(response.body.isActive).toBe(updateData.isActive);
    });

    it('should return error for non-existent subscription', async () => {
      const updateData = {
        name: 'Updated Netflix',
        amount: 19.99
      };

      const response = await request(app)
        .put('/subscriptions/non-existent-id')
        .set('Authorization', 'Bearer ' + authToken)
        .send(updateData)
        .expect(404);

      expect(response.body.message).toContain('не найдена');
    });

    it('should not allow updating other user subscription', async () => {
      const otherUserResponse = await request(app)
        .post('/auth/register')
        .send({
          email: 'other@example.com',
          password: 'password123',
          name: 'Other User'
        });

      const otherSubscription = await request(app)
        .post('/subscriptions')
        .set('Authorization', 'Bearer ' + otherUserResponse.body.token)
        .send({
          name: 'Other Subscription',
          category: 'software',
          amount: 9.99,
          currency: 'USD',
          billingCycle: 'monthly'
        });

      const response = await request(app)
        .put('/subscriptions/' + otherSubscription.body.id)
        .set('Authorization', 'Bearer ' + authToken)
        .send({
          name: 'Hacked Subscription'
        })
        .expect(404);

      expect(response.body.message).toContain('не найдена');
    });
  });

  describe('DELETE /subscriptions/:id', () => {
    let subscriptionId;

    beforeEach(async () => {
      const createResponse = await request(app)
        .post('/subscriptions')
        .set('Authorization', 'Bearer ' + authToken)
        .send({
          name: 'Test Subscription',
          category: 'software',
          amount: 9.99,
          currency: 'USD',
          billingCycle: 'monthly'
        });

      subscriptionId = createResponse.body.id;
    });

    it('should delete subscription successfully', async () => {
      const response = await request(app)
        .delete('/subscriptions/' + subscriptionId)
        .set('Authorization', 'Bearer ' + authToken)
        .expect(200);

      expect(response.body.message).toContain('успешно удалена');

      const getResponse = await request(app)
        .get('/subscriptions')
        .set('Authorization', 'Bearer ' + authToken)
        .expect(200);

      expect(getResponse.body.length).toBe(0);
    });

    it('should return error for non-existent subscription', async () => {
      const response = await request(app)
        .delete('/subscriptions/non-existent-id')
        .set('Authorization', 'Bearer ' + authToken)
        .expect(404);

      expect(response.body.message).toContain('не найдена');
    });
  });

  describe('Data Validation', () => {
    it('should validate subscription name', async () => {
      const invalidData = {
        name: '',
        category: 'entertainment',
        amount: 15.99,
        currency: 'USD',
        billingCycle: 'monthly'
      };

      const response = await request(app)
        .post('/subscriptions')
        .set('Authorization', 'Bearer ' + authToken)
        .send(invalidData)
        .expect(400);

      expect(response.body.message).toContain('Название обязательно');
    });

    it('should validate amount', async () => {
      const invalidData = {
        name: 'Netflix',
        category: 'entertainment',
        amount: -10,
        currency: 'USD',
        billingCycle: 'monthly'
      };

      const response = await request(app)
        .post('/subscriptions')
        .set('Authorization', 'Bearer ' + authToken)
        .send(invalidData)
        .expect(400);

      expect(response.body.message).toContain('Сумма должна быть положительной');
    });

    it('should validate billing cycle', async () => {
      const invalidData = {
        name: 'Netflix',
        category: 'entertainment',
        amount: 15.99,
        currency: 'USD',
        billingCycle: 'invalid-cycle'
      };

      const response = await request(app)
        .post('/subscriptions')
        .set('Authorization', 'Bearer ' + authToken)
        .send(invalidData)
        .expect(400);

      expect(response.body.message).toContain('Недопустимый цикл');
    });
  });
});
