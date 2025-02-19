import { Router } from 'express';
import { listBimesters } from '../controllers/bimesterController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authenticateToken, listBimesters);

export default router;
