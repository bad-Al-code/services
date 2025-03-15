import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.get('/api/users/asd', (req: Request, res: Response) => {
  res.status(200).send('Hello from server');
});

export default app;
