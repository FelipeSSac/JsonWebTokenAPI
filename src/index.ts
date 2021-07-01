import express from 'express';
import 'reflect-metadata';

import './database/connect';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Server started at port ${port}!`));