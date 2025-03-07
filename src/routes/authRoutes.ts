import { Router } from "express";
import { loginUser, refreshToken } from "../controllers/authController";

const router = Router();

router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);

export default router;
