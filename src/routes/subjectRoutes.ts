import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { getAllSubjects, getSubjectById, createSubject, updateSubject, deleteSubject } from '../controllers/subjectController';

const router = Router();

router.get('/', authenticateToken, getAllSubjects);
router.get('/:id', authenticateToken, getSubjectById);
router.post('/', authenticateToken, createSubject);
router.put('/:id', authenticateToken, updateSubject);
router.delete('/:id', authenticateToken, deleteSubject);

export default router;
