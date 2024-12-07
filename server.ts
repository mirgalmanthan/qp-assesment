import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
