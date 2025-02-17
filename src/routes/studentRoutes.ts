import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import {
  getFilteredStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from '../controllers/studentController';

const router = Router();

router.get('/', authenticateToken, getFilteredStudents);
router.get('/:id', authenticateToken, getStudentById);
router.post('/', authenticateToken, createStudent);
router.put('/:id', authenticateToken, updateStudent);
router.delete('/:id', authenticateToken, deleteStudent);

export default router;
