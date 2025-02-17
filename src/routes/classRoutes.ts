import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { getFilteredClasses, getClassById, createClass, updateClass, deleteClass } from '../controllers/classController';

const router = Router();

// 🔹 Agora todas as rotas exigem autenticação
router.get('/', authenticateToken, getFilteredClasses);
router.get('/:id', authenticateToken, getClassById);
router.post('/', authenticateToken, createClass);
router.put('/:id', authenticateToken, updateClass);
router.delete('/:id', authenticateToken, deleteClass);

export default router;
