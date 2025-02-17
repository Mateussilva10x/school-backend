import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { generateReport } from '../controllers/reportController';

const router = Router();

router.get('/generate/:studentId', authenticateToken, generateReport);

export default router;
