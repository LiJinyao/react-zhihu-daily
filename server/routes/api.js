import express from 'express';
import zhihuDaily from '../zhihuDailyTransmit/transmitter';
const router = new express.Router();

// send all request to zhihuDaily server.
router.get('*', (req, res) => {
  zhihuDaily(req.path).then(data => {
    res.send(JSON.parse(data));
  }).catch(err => {
    res.send(err);
  });
});
export default router;
