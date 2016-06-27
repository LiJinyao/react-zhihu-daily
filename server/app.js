import Express from 'express';
import logger from 'morgan';
import api from './routes/api';

const app = new Express();

app.use(logger('dev'));

// load routers
app.use('/api', api);
app.listen(8080);
