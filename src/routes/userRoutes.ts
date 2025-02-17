import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateToken, asyncHandler(createUser));
router.get('/', authenticateToken, asyncHandler(getAllUsers));
router.get('/:id', authenticateToken, asyncHandler(getUserById));
router.put('/:id', authenticateToken, asyncHandler(updateUser));
router.delete('/:id', authenticateToken, asyncHandler(deleteUser));

export default router;
