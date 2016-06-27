import express from 'express';
const router = new express.Router();

router.get('/', (req, res) => {
  res.send('Root');
});

router.get('/news/latest', (req, res) => {
  res.send('http://news-at.zhihu.com/api/4/news');
});
export default router;
