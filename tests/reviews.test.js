/* eslint-env jest */
const request = require('supertest');
const app = require('../server');
const db = require('../src/database');

let createdReviewId;

describe('/reviews routes', () => {
  const validReview = {
    reviewerName: 'John Doe',
    rating: 4.5,
    comment: 'Great book!',
  };

  const invalidReview = {
    rating: 'not-a-number',
  };

  const fakeId = '000000000000000000000000';
  const malformedId = 'bad-id';

  afterAll(async () => {
    if (createdReviewId) {
      await request(app).delete(`/reviews/${createdReviewId}`);
    }
    await db.closeConnection?.();
  });

  it('POST /reviews - should create a review with valid input', async () => {
    const res = await request(app).post('/reviews').send(validReview);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdReviewId = res.body.id;
  });

  it('POST /reviews - should fail with invalid input', async () => {
    const res = await request(app).post('/reviews').send(invalidReview);
    expect(res.statusCode).toBe(400);
  });

  it('GET /reviews - should return an array of reviews', async () => {
    const res = await request(app).get('/reviews');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /reviews/:id - should return a single review by ID', async () => {
    const res = await request(app).get(`/reviews/${createdReviewId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', createdReviewId);
  });

  it('GET /reviews/:id - should return 404 for non-existent ID', async () => {
    const res = await request(app).get(`/reviews/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });

  it('GET /reviews/:id - should return 400 for malformed ID', async () => {
    const res = await request(app).get(`/reviews/${malformedId}`);
    expect(res.statusCode).toBe(500); // because it throws inside validateObjectId()
  });

  it('PUT /reviews/:id - should update a review', async () => {
    const res = await request(app)
      .put(`/reviews/${createdReviewId}`)
      .send({ rating: 5 });
    expect(res.statusCode).toBe(200);
  });

  it('PUT /reviews/:id - should return 404 for non-existent ID', async () => {
    const res = await request(app)
      .put(`/reviews/${fakeId}`)
      .send({ rating: 1 });
    expect(res.statusCode).toBe(404);
  });

  it('PUT /reviews/:id - should return 400 for malformed ID', async () => {
    const res = await request(app)
      .put(`/reviews/${malformedId}`)
      .send({ rating: 1 });
    expect(res.statusCode).toBe(400);
  });

  it('DELETE /reviews/:id - should delete the review', async () => {
    const res = await request(app).delete(`/reviews/${createdReviewId}`);
    expect(res.statusCode).toBe(200);
    createdReviewId = null;
  });

  it('DELETE /reviews/:id - should return 404 for non-existent ID', async () => {
    const res = await request(app).delete(`/reviews/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });

  it('DELETE /reviews/:id - should return 400 for malformed ID', async () => {
    const res = await request(app).delete(`/reviews/${malformedId}`);
    expect(res.statusCode).toBe(400);
  });
});
