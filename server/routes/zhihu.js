import express from 'express';
import zhihuApiTransmitter from '../zhihuDailyTransmit/zhihuTransmitter';
import RAMDB from '../database/RAMDB';
const DB = new RAMDB();
const router = new express.Router();

router.get('/explore', (req, res) => {
  const explore = Object.assign(
    { lastUpdate: DB.get('explore').lastUpdate },
    DB.get('explore').value);

  res.json(explore);
});
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
