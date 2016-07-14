import express from 'express';
import get from '../zhihuDailyTransmit/apiTransmitter';
const router = new express.Router();

// send all request to zhihuDaily server.
router.get('*', (req, res) => {
  get(req.path).then(data => {
    res.send(JSON.parse(data));
  }).catch(err => {
    res.send(err);
  });
});
export default router;
