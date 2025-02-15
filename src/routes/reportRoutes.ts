import { Router } from 'express';
import { generateReport } from '../controllers/reportController';

const router = Router();

router.post('/generate', generateReport);

export default router;
