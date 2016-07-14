import express from 'express';
import getImg from '../zhihuDailyTransmit/imgTransmitter';
const router = new express.Router();

// send all request to zhihuDaily server.
router.get('*', (req, res) => {
  getImg(req.query.url, res).then(data => {
    res.end();
  }).catch(err => {
    res.send(err);
  });
});
export default router;
