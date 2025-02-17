import { Router } from 'express';
import { generateReport } from '../controllers/reportController';

const router = Router();

router.post('/generate', async (req, res) => {
  await generateReport(req, res);
});

export default router;
