import { Router } from "express";
import {
  getClassDiaries,
  getClassDiaryById,
  createClassDiary,
  updateClassDiary,
  deleteClassDiary,
} from "../controllers/classDiaryController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticateToken, getClassDiaries);
router.get("/:id", authenticateToken, getClassDiaryById);
router.post("/", authenticateToken, createClassDiary);
router.put("/:id", authenticateToken, updateClassDiary);
router.delete("/:id", authenticateToken, deleteClassDiary);

export default router;
