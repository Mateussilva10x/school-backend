import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { getGradesByFilters, getGradesByStudent, getGradesByStudentAndBimester, saveGrade } from '../controllers/gradesController';

const router = Router();

router.get('/', authenticateToken, getGradesByFilters);
router.get('/student', authenticateToken, getGradesByStudent);
router.get('/student/bimester', authenticateToken, getGradesByStudentAndBimester);
router.post('/', authenticateToken, saveGrade);

export default router;
