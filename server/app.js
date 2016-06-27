import express from 'express';
import logger from 'morgan';
import api from './routes/api';

const app = express();

app.use('/api', api);

app.listen(80, () => {
  console.log('app is listenning at port: 80');
});
