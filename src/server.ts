/* eslint-disable no-console */
import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.get('/', (request, response) => response.json({ msg: 'Hello GoStack' }));
app.listen(3333, () => console.log('🤡 running in port 3333'));
