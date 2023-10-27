import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

import { EndPoints, Dishes } from'./routes';

app.use(cors());
app.use(express.json());

app.use([EndPoints, Dishes]);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
