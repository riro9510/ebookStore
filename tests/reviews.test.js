/* eslint-env jest */
const request = require('supertest');
const app = require('../server');
const db = require('../src/database');

const validId = '67e4dd2cde2a1f623802f25d';
let createdReviewId;

describe('/api/reviews routes', () => {
  const validReview = {
    title: 'This is a test',
    rating: 4.5,
    comment: 'Solid book. Still a test though',
    author: validId,
    bookId: validId,
  };

  const invalidReview = {
    rating: 'not-a-number',
  };

  const fakeId = '000000000000000000000000';
  const badId = 'invalid-id';

  afterAll(async () => {
    if (createdReviewId) {
      await request(app).delete(`/api/reviews/${createdReviewId}`);
    }
    await db.closeConnection?.();
  });

  it('POST /api/reviews - should create a review', async () => {
    const res = await request(app).post('/api/reviews').send(validReview);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdReviewId = res.body._id;
  });

  it('POST /api/reviews - should return 400 with invalid input', async () => {
    const res = await request(app).post('/api/reviews').send(invalidReview);

    expect(res.statusCode).toBe(400);
  });

  it('GET /api/reviews - should return all reviews', async () => {
    const res = await request(app).get('/api/reviews');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/reviews/:id - should return a review by ID', async () => {
    const res = await request(app).get(`/api/reviews/${createdReviewId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', createdReviewId);
  });

  it('GET /api/reviews/:id - should return 404 for non-existent ID', async () => {
    const res = await request(app).get(`/api/reviews/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });

  it('GET /api/reviews/:id - should return 400 for malformed ID', async () => {
    const res = await request(app).get(`/api/reviews/${badId}`);
    expect(res.statusCode).toBe(400);
  });

  it('PUT /api/reviews/:id - should update the review', async () => {
    const res = await request(app)
      .put(`/api/reviews/${createdReviewId}`)
      .send({ rating: 5 });

    expect(res.statusCode).toBe(204);
  });

  it('PUT /api/reviews/:id - should return 404 for non-existent ID', async () => {
    const res = await request(app)
      .put(`/api/reviews/${fakeId}`)
      .send({ rating: 1 });

    expect(res.statusCode).toBe(404);
  });

  it('PUT /api/reviews/:id - should return 400 for malformed ID', async () => {
    const res = await request(app)
      .put(`/api/reviews/${badId}`)
      .send({ rating: 1 });

    expect(res.statusCode).toBe(400);
  });

  it('DELETE /api/reviews/:id - should delete the review', async () => {
    const res = await request(app).delete(`/api/reviews/${createdReviewId}`);
    expect(res.statusCode).toBe(204);
    createdReviewId = null;
  });

  it('DELETE /api/reviews/:id - should return 404 for non-existent ID', async () => {
    const res = await request(app).delete(`/api/reviews/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });

  it('DELETE /api/reviews/:id - should return 400 for malformed ID', async () => {
    const res = await request(app).delete(`/api/reviews/${badId}`);
    expect(res.statusCode).toBe(400);
  });
});
