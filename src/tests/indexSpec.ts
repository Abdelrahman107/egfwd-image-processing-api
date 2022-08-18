import supertest from 'supertest';
import app from '../index';
const request = supertest(app);

describe('GET / => from localhost:3000/', (): void => {
  it('should return 200 OK', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
