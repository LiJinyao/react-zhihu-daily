import express from 'express';
import RAMDB from '../database/RAMDB';
const router = new express.Router();
const DB = new RAMDB();
router.get('*', (req, res) => {
  res.json(JSON.stringify(DB.get('explore')) + JSON.stringify(DB.get('circlesIndex')));
});
export default router;
