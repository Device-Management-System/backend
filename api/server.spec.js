const request = require('supertest');

const server = require('./server.js');

const db = require('../data/dbConfig.js');

describe('server running ', () => {
  it('should return a 200', async () => {
    return request(server).get('/').expect(200);
  });

  it('should use json ', async () => {
    const res = await request(server).get('');
    expect(res.type).toBe('application/json');
  });
  it('should say server is working', async () => {
    const res = await request(server).get('');
    expect(res.body).toMatchObject({ api: 'server is working' });
  });
  it('should be in a development environment', async () => {
    expect(process.env.DB_ENV).toBe('development');
  });
});
