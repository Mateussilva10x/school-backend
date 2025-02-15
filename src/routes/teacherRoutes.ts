import { Router } from 'express';
import { getFilteredTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher } from '../controllers/teacherController';

const router = Router();

router.get('/', getFilteredTeachers);
router.get('/:id', getTeacherById);
router.post('/', createTeacher);
router.put('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);

export default router;
