import express from 'express';
import logger from 'morgan';
import api from './routes/api';

const app = express();
app.use(logger('dev'));
app.use('/api', api);

app.listen(8080);
