import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { login } from "../services/authService";

const JWT_SECRET = process.env.JWT_SECRET || "chave-secreta";
const JWT_EXPIRATION = "24h";

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Token não fornecido" });
      return;
    }

    jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
      if (err) {
        res.status(401).json({ message: "Token inválido ou expirado" });
        return;
      }

      // ✅ Gerar um novo token sem precisar de login
      const newToken = jwt.sign(
        { id: decoded.id, email: decoded.email, role: decoded.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
      );

      res.json({ token: newToken });
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erro ao renovar o token",
        error: (error as Error).message,
      });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await login(email, password);
    res.json(user);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
