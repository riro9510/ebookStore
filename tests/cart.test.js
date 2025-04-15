/* eslint-env jest */
const request = require('supertest');
const app = require('../server'); // Adjust path as needed
const db = require('../src/database'); // Adjust path as needed

let createdCartId;

describe('/api/cart routes', () => {
  const validCart = {
    userId: '643a6b29f3d5b8d2d8e4d531',
    books: [
      { id: '643a6b29f3d5b8d2d8e4d531', quantity: 2 },
      { id: '643a6b29f3d5b8d2d8e4d531', quantity: 1 },
    ],
    totalPrice: 29.99,
  };

  const updatedCart = {
    userId: '643a6b29f3d5b8d2d8e4d531',
    books: [{ id: '643a6b29f3d5b8d2d8e4d531', quantity: 5 }],
    totalPrice: 29.99,
  };

  const invalidCart = {
    books: 'invalid-format',
  };

  const fakeId = '000000000000000000000000';
  const badId = 'not-a-valid-id';

  afterAll(async () => {
    if (createdCartId) {
      await request(app).delete(`/api/cart/${createdCartId}`);
    }
    await db.closeConnection?.();
  });

  it('POST /api/cart - should create a new cart', async () => {
    const res = await request(app).post('/api/cart').send(validCart);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdCartId = res.body._id;
  });

  it('POST /api/cart - should fail with invalid body', async () => {
    const res = await request(app).post('/api/cart').send(invalidCart);
    expect(res.statusCode).toBe(400);
  });

  it('GET /api/cart/:id - should return a cart by ID', async () => {
    const res = await request(app).get(`/api/cart/${createdCartId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', createdCartId);
  });

  it('GET /api/cart/:id - should return 404 if not found', async () => {
    const res = await request(app).get(`/api/cart/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });

  it('GET /api/cart/:id - should return 400 for invalid ID format', async () => {
    const res = await request(app).get(`/api/cart/${badId}`);
    expect(res.statusCode).toBe(400);
  });

  it('GET /api/cart - should return all carts', async () => {
    const res = await request(app).get('/api/cart');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('PUT /api/cart/:id - should update a cart', async () => {
    const res = await request(app)
      .put(`/api/cart/${createdCartId}`)
      .send(updatedCart);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Cart updated.' });
  });

  it('PUT /api/cart/:id - should return 404 for non-existent ID', async () => {
    const res = await request(app).put(`/api/cart/${fakeId}`).send(updatedCart);
    expect(res.statusCode).toBe(404);
  });

  it('DELETE /api/cart/:id - should delete a cart', async () => {
    const res = await request(app).delete(`/api/cart/${createdCartId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Cart deleted successfully' });
    createdCartId = null;
  });

  it('DELETE /api/cart/:id - should return 404 if cart not found', async () => {
    const res = await request(app).delete(`/api/cart/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });

  it('DELETE /api/cart/:id - should return 400 for malformed ID', async () => {
    const res = await request(app).delete(`/api/cart/${badId}`);
    expect(res.statusCode).toBe(400);
  });
});
