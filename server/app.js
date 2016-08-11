import Express from 'express';
import logger from 'morgan';
import zhihu from './routes/zhihu';
import path from 'path';
import database from './database/createTable';
const app = new Express();

app.use(Express.static(path.join(__dirname, '/public')));
app.use(logger('dev'));

// 统一使用zhihu做代理
app.use('/zhihu', zhihu);
// send all requests to index.html so browserHistory in React Router works
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(8001);
