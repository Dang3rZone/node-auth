import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Worlds!');
});

app.listen(8000, () => {
  console.log('Server started on port 8000');
});
