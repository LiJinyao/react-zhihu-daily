import Express from 'express';
import logger from 'morgan';
import api from './routes/api';
import path from 'path';

const app = new Express();

app.use(Express.static(path.join(__dirname, '/public')));
app.use(logger('dev'));

// load api router
app.use('/api', api);
// send all requests to index.html so browserHistory in React Router works
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(8080);
