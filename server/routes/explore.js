import express from 'express';
import RAMDB from '../database/RAMDB';
const router = new express.Router();
const DB = new RAMDB();
router.get('*', (req, res) => {
  const explore = Object.assign(
    { lastUpdate: DB.get('explore').lastUpdate },
    DB.get('explore').value);

  res.json(explore);
});
export default router;
