import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Get latest news');
});

export default router;
