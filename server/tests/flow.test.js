const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

// Sample route to test
app.post('/api/test', (req, res) => {
  res.json({ message: 'Test passed' });
});

test('Test endpoint returns correct response', async () => {
  const res = await request(app).post('/api/test');
  expect(res.body.message).toBe('Test passed');
});
