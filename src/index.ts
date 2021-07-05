import express from 'express';
import 'reflect-metadata';
import cors from 'cors';

import './database/connect';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Server started at port ${port}!`));