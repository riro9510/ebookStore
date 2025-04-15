const request = require('supertest');
const app = require('../server');
const db = require('../src/database');

let createdUserId;
let bulkUserIds = [];

describe('/api/users/ routes', () => {
  const validUser = {
    username: 'TestUser',
    password: 'ThisIsAPassword',
    email: 'testuser@example.com',
    shipping_address: {
      street: '123 Roosevelt Lane',
      city: 'Anchorage',
      state: 'AK',
      zip: '99501',
    },
  };

  const invalidUserMissingField = {
    username: 'IncompleteUser',
    password: 'NoEmailOrAddress',
  };

  const invalidZipUser = {
    ...validUser,
    shipping_address: {
      ...validUser.shipping_address,
      zip: 'INVALID',
    },
  };

  const fakeObjectId = '000000000000000000000000';
  const malformedObjectId = 'abc123';

  afterAll(async () => {
    if (createdUserId) {
      await request(app).delete(`/api/users/${createdUserId}`);
    }

    for (const id of bulkUserIds) {
      await request(app).delete(`/api/users/${id}`);
    }

    await db.closeConnection?.();
  });

  it('POST /api/users - should create a user with valid input', async () => {
    const res = await request(app).post('/api/users').send(validUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdUserId = res.body._id;
  });

  it('POST /api/users - should fail with missing required fields', async () => {
    const res = await request(app)
      .post('/api/users')
      .send(invalidUserMissingField);
    expect(res.statusCode).toBe(400);
  });

  it('POST /api/users - should fail with invalid zip format', async () => {
    const res = await request(app).post('/api/users').send(invalidZipUser);
    expect(res.statusCode).toBe(400);
  });

  it('GET /api/users/:id - should return 404 for non-existent ObjectId', async () => {
    const res = await request(app).get(`/api/users/${fakeObjectId}`);
    expect(res.statusCode).toBe(404);
  });

  it('GET /api/users/:id - should return 400 for malformed ObjectId', async () => {
    const res = await request(app).get(`/api/users/${malformedObjectId}`);
    expect(res.statusCode).toBe(400);
  });

  it('PUT /api/users/:id - should return 404 for non-existent ObjectId', async () => {
    const res = await request(app)
      .put(`/api/users/${fakeObjectId}`)
      .send({ username: 'Fail' });
    expect(res.statusCode).toBe(404);
  });

  it('PUT /api/users/:id - should return 400 for malformed ObjectId', async () => {
    const res = await request(app)
      .put(`/api/users/${malformedObjectId}`)
      .send({ username: 'Fail' });
    expect(res.statusCode).toBe(400);
  });

  it('DELETE /api/users/:id - should return 404 for non-existent ObjectId', async () => {
    const res = await request(app).delete(`/api/users/${fakeObjectId}`);
    expect(res.statusCode).toBe(404);
  });

  it('DELETE /api/users/:id - should return 400 for malformed ObjectId', async () => {
    const res = await request(app).delete(`/api/users/${malformedObjectId}`);
    expect(res.statusCode).toBe(400);
  });

  afterAll(async () => {
    await db.closeConnection?.();
  });
});
