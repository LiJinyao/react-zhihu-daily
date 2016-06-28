import express from 'express';
import { request } from 'http';
import zhihuDaily from '../zhihuDailyTransmit/transmitter';
const router = new express.Router();

router.get('*', (req, res) => {
  zhihuDaily(req.path).then(data => {
    res.send(data);
  });
});
// http://news-at.zhihu.com/api/4/news/latest
export default router;
