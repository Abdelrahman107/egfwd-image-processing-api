import express from 'express';
import imageResizer from './api/imageResizer';
const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send('<article> <header><h1>Welcome to Image Processing API</h1> <p>In order to use it: </p> <p>Navigate to api/images, correct format: http://localhost:3000/api/images?filename=fjord&width=500&height=400</p> </header> <p><a href="http://localhost:3000/api/images?filename=fjord&width=500&height=400">Click for An Example</a> </p> </article>');
});
routes.use('/images', imageResizer);
export default routes;
