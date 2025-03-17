import { Request, Response } from "express";
import { getDashboardData } from "../services/dashboardService";

export const getDashboardStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const stats = await getDashboardData();
    res.status(200).json(stats);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erro ao obter dados da dashboard",
        error: (error as Error).message,
      });
  }
};
