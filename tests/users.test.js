const request = require('supertest');
const app = require('../server');
const db = require('../src/database');

let createdUserId;
let bulkUserIds = [];

describe('/users/ routes', () => {
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
      await request(app).delete(`/users/${createdUserId}`);
    }

    for (const id of bulkUserIds) {
      await request(app).delete(`/users/${id}`);
    }

    await db.closeConnection?.();
  });

  it('POST /users - should create a user with valid input', async () => {
    const res = await request(app).post('/users').send(validUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdUserId = res.body._id;
  });

  it('POST /users - should fail with missing required fields', async () => {
    const res = await request(app).post('/users').send(invalidUserMissingField);
    expect(res.statusCode).toBe(400);
  });

  it('POST /users - should fail with invalid zip format', async () => {
    const res = await request(app).post('/users').send(invalidZipUser);
    expect(res.statusCode).toBe(400);
  });

  it('GET /users/:id - should return 404 for non-existent ObjectId', async () => {
    const res = await request(app).get(`/users/${fakeObjectId}`);
    expect(res.statusCode).toBe(404);
  });

  it('GET /users/:id - should return 400 for malformed ObjectId', async () => {
    const res = await request(app).get(`/users/${malformedObjectId}`);
    expect(res.statusCode).toBe(400);
  });

  it('PUT /users/:id - should return 404 for non-existent ObjectId', async () => {
    const res = await request(app)
      .put(`/users/${fakeObjectId}`)
      .send({ username: 'Fail' });
    expect(res.statusCode).toBe(404);
  });

  it('PUT /users/:id - should return 400 for malformed ObjectId', async () => {
    const res = await request(app)
      .put(`/users/${malformedObjectId}`)
      .send({ username: 'Fail' });
    expect(res.statusCode).toBe(400);
  });

  it('DELETE /users/:id - should return 404 for non-existent ObjectId', async () => {
    const res = await request(app).delete(`/users/${fakeObjectId}`);
    expect(res.statusCode).toBe(404);
  });

  it('DELETE /users/:id - should return 400 for malformed ObjectId', async () => {
    const res = await request(app).delete(`/users/${malformedObjectId}`);
    expect(res.statusCode).toBe(400);
  });

  afterAll(async () => {
    await db.closeConnection?.();
  });
});
