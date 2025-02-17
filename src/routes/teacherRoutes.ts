import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { getFilteredTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher } from '../controllers/teacherController';

const router = Router();

router.get('/', authenticateToken, getFilteredTeachers);
router.get('/:id', authenticateToken, getTeacherById);
router.post('/', authenticateToken, createTeacher);
router.put('/:id', authenticateToken, updateTeacher);
router.delete('/:id', authenticateToken, deleteTeacher);

export default router;
