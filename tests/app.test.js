const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
  it('should return 200 with welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Hello from nodejs-demo-app!');
    expect(res.body).toHaveProperty('version');
    expect(res.body).toHaveProperty('timestamp');
  });
});

describe('GET /health', () => {
  it('should return healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'healthy');
    expect(res.body).toHaveProperty('uptime');
  });
});

describe('GET /api/items', () => {
  it('should return list of items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('items');
    expect(Array.isArray(res.body.items)).toBe(true);
    expect(res.body.items.length).toBe(3);
  });

  it('each item should have id and name', async () => {
    const res = await request(app).get('/api/items');
    res.body.items.forEach((item) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
    });
  });
});
