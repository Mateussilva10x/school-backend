import { Router } from 'express';
import { getGradesByFilters, getGradesByStudent, getGradesByStudentAndBimester, saveGrade } from '../controllers/gradesController';

const router = Router();

router.get('/', getGradesByFilters);
router.get('/student', getGradesByStudent);
router.get('/student/bimester', getGradesByStudentAndBimester);
router.post('/', saveGrade);

export default router;
