import express from 'express';
import routes from './routes/index';
const app = express();
const port = 3000;
app.use(express.json());
app.use('/api', routes);
app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('<article> <header><h1>Welcome to Image Processing API</h1> <p>In order to use it: </p> <p>Navigate to api/images</p> </header> <p><a href="http://localhost:3000/api/images?filename=fjord&width=500&height=400">Click for An Example</a> </p> </article>');
});

app.listen(port, (): void => {
  console.log(`Server app listening on port ${port}`);
});

export default app;
