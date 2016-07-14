import express from 'express';
import zhihuApiTransmitter from '../zhihuDailyTransmit/zhihuTransmitter';
const router = new express.Router();

// send all request to zhihuDaily server.
router.get('*', (req, res) => {
  // pass res to the transmitter.
  zhihuApiTransmitter(req.query.url, res)
    .then(() => res.end())
    .catch(err => {
      res.sendStatus(err);
    });
});
export default router;
