import express from 'express';
import zhihuDaily from '../zhihuDailyTransmit/transmitter';
const router = new express.Router();

router.get('*', (req, res) => {
  zhihuDaily(req.path).then(data => {
    res.send(data);
  });
});
export default router;
