import express from 'express';
import * as dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import adminRouter from './src/routers/admin';
import userRouter from './src/routers/user';
import { swaggerSpec } from './src/config/swagger';

dotenv.config();
const app = express();
app.use(express.json())

const port = process.env.PORT;

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve Swagger spec as JSON
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('/', (req, res) => {
  res.send({ 
    message: "Hello Grocery API",
    documentation: "Visit /api-docs for API documentation"
  });
});

app.use('/admin', adminRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`API Documentation available at http://localhost:${port}/api-docs`);
});
