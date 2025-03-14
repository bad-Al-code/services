import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Auth Service is running!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
