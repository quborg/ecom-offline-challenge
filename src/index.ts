import 'ts-mocha';
import express from 'express';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json';

const app = express();
const port = process.env.PORT || 3000;

import { Cooktime, Suggest, Dishes } from './routes';

app.use(cors());
app.use(express.json());

// app.use('/', [Dishes]);
app.use([Dishes, Cooktime, Suggest]);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});