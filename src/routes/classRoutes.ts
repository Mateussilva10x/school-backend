import { Router } from 'express';
import { getFilteredClasses, getClassById, createClass, updateClass, deleteClass } from '../controllers/classController';

const router = Router();

router.get('/', getFilteredClasses);
router.get('/:id', getClassById);
router.post('/', createClass);
router.put('/:id', updateClass);
router.delete('/:id', deleteClass);

export default router;
