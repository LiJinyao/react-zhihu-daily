import express from 'express';
import zhihuApiTransmitter from '../zhihuDailyTransmit/zhihuTransmitter';
import RAMDB from '../database/RAMDB';
import log4js from 'log4js';
const DB = new RAMDB();
const router = new express.Router();
const logger = log4js.getLogger();

router.get('/explore', (req, res) => {
  const explore = DB.get('explore').value;
  explore.lastUpdate = DB.get('explore').lastUpdate;
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
