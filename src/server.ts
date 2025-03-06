import express from 'express';
import bodyParser from 'body-parser';

import executeApi from './routes/executeApi';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', executeApi);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
