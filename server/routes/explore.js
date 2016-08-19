import express from 'express';
import RAMDB from '../database/RAMDB';
const router = new express.Router();
const DB = new RAMDB();
router.get('*', (req, res) => {
  res.send(DB.get('explore'));
});
export default router;
