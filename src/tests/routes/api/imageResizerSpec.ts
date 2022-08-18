import supertest from 'supertest';
import path from 'path';
import fs from 'fs';
import app from '../../../index';
import sharp from 'sharp';

const request = supertest(app);
const resizedDirectory = path.join(__dirname, '../../../../resizedImage');

describe('GET /api/images?filename=fjord&width=700&height=700', (): void => {
  it('should return 200 OK', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
  it('should save the resized image in resizedImage folder with name fjord_700_700.jpg', async () => {
    await request.get('/api/images?filename=fjord&width=700&height=700');
    const filename: string = 'fjord';
    const width: number = 700;
    const height: number = 700;
    const imageDestination: string = path.join(resizedDirectory, `${filename}_${width}_${height}.jpg`);
    expect(fs.existsSync(imageDestination)).toBe(true);
  });
});

describe('GET /api/images?filename=abc&width=700&height=700', (): void => {
  it('should return 400 since abc is not an image in images folder', async () => {
    const response = await request.get('/api/images?filename=notimage&width=700&height=700');
    expect(response.status).toBe(400);
  });
});

describe('GET /api/images?filename=fjord&width=abc&height=700', (): void => {
  it('should return 400 since width must be a number not abc', async () => {
    const response = await request.get('/api/images?filename=fjord&width=abc&height=700');
    expect(response.status).toBe(400);
  });
});

describe('GET /api/images?filename=encenadaport&width=700&height=0', (): void => {
  it('should return 400 since height must be greater than 0', async () => {
    const response = await request.get('/api/images?filename=fjord&width=700&height=0');
    expect(response.status).toBe(400);
  });
});

describe('GET /api/images?width=700&height=700', (): void => {
  it('should return 400 since filename is not provided', async () => {
    const response = await request.get('/api/images?width=700&height=700');
    expect(response.status).toBe(400);
  });
});

// test that resizing works
describe('testing Sharp Package to resize an fjord.jpg image with resize(500,400)', (): void => {
  it('should return true after image is resized sucessfully with width=500 ', async () => {
    const meta = await sharp(path.join(__dirname, '../../../../images/fjord.jpg'))
      .resize(500, 400)
      .toBuffer()
      .then((data: Buffer) => {
        return sharp(data).metadata();
      });
    expect(meta.width).toBe(500);
  });
  it('should return true after image is resized sucessfully with height=400', async () => {
    const meta = await sharp(path.join(__dirname, '../../../../images/fjord.jpg'))
      .resize(500, 400)
      .toBuffer()
      .then((data: Buffer) => {
        return sharp(data).metadata();
      });
    expect(meta.height).toBe(400);
  });
});
