const request = require('supertest');
const app = require('../server');
const db = require('../src/database');

let createdBookId;
let bulkInsertedIds = [];

describe('/books routes (with DB cleanup)', () => {
  const validBook = {
    title: 'The Silent Shore',
    author: 'Elaine Morgan',
    stock: 3,
    pages: 310,
    description:
      'A gripping tale of survival and secrets on a desolate coastline.',
    genre: 'Mystery',
    tags: ['suspense', 'thriller', 'coastal'],
    price: 14.99,
  };

  afterAll(async () => {
    if (createdBookId) {
      await request(app).delete(`/books/${createdBookId}`);
    }

    for (const id of bulkInsertedIds) {
      await request(app).delete(`/books/${id}`);
    }

    await db.closeConnection?.();
  });

  it('POST /books - should create a new book', async () => {
    const res = await request(app).post('/books').send(validBook);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdBookId = res.body._id;
  });

  it('GET /books - should return an array of books', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /books/:id - should return a single book', async () => {
    const res = await request(app).get(`/books/${createdBookId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id', createdBookId);
  });

  it('PUT /books/:id - should update the book', async () => {
    const res = await request(app)
      .put(`/books/${createdBookId}`)
      .send({ stock: 5 });
    expect(res.statusCode).toBe(200);
  });

  it('DELETE /books/:id - should delete the book', async () => {
    const res = await request(app).delete(`/books/${createdBookId}`);
    expect(res.statusCode).toBe(200);
    createdBookId = null;
  });

  it('POST /books/bulk - should insert multiple books', async () => {
    const res = await request(app)
      .post('/books/bulk')
      .send([
        {
          title: 'Bulk Book 1',
          author: 'Author One',
          stock: 2,
          pages: 120,
          description: 'First bulk insert',
          genre: 'Drama',
          tags: ['bulk', 'drama'],
          price: 9.99,
        },
        {
          title: 'Bulk Book 2',
          author: 'Author Two',
          stock: 5,
          pages: 200,
          description: 'Second bulk insert',
          genre: 'Sci-Fi',
          tags: ['bulk', 'scifi'],
          price: 12.5,
        },
      ]);

    expect(res.statusCode).toBe(201);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);

    bulkInsertedIds = res.body;
  });

  it('GET /books/:id - should return 404 for non-existent ID', async () => {
    const res = await request(app).get('/books/000000000000000000000000');
    expect(res.statusCode).toBe(404);
  });

  it('GET /books/:id - should return 400 for malformed ID', async () => {
    const res = await request(app).get('/books/invalid-id');
    expect(res.statusCode).toBe(400);
  });
});
