import express from 'express';
import * as dotenv from 'dotenv';
import adminRouter from './src/routers/admin';
import userRouter from './src/routers/user';

dotenv.config();
const app = express();
app.use(express.json())

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send({ message: "Hello Grocery API"});
});

app.use('/admin', adminRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
