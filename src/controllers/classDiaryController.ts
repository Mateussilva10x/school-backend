import { Request, Response } from "express";
import * as classDiaryService from "../services/classDiaryService";

export const getClassDiaries = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refClass, refSubject, startDate, endDate } = req.query;

    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      const differenceInDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
      if (differenceInDays > 30) {
        res.status(400).json({ message: "O intervalo máximo permitido é de 30 dias." });
        return;
      }
    }

    const diaries = await classDiaryService.getClassDiaries(
      refClass as string,
      refSubject as string,
      startDate as string,
      endDate as string
    );

    res.status(200).json(diaries);
  } catch (error) {
    console.error("Erro ao buscar resumos:", error);
    res.status(500).json({ message: "Erro ao buscar resumos", error: (error as Error).message });
  }
};


export const getClassDiaryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const diaryEntry = await classDiaryService.getClassDiaryById(id);

    if (!diaryEntry) {
      res.status(404).json({ message: "Registro de diário não encontrado" });
      return;
    }

    res.json(diaryEntry);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erro ao buscar registro do diário",
        error: (error as Error).message,
      });
  }
};

export const createClassDiary = async (req: Request, res: Response) => {
  try {
    const newDiary = await classDiaryService.createClassDiary(req.body);
    res.status(201).json(newDiary);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar resumo", error });
  }
};

export const updateClassDiary = async (req: Request, res: Response) => {
  try {
    const updatedDiary = await classDiaryService.updateClassDiary(
      req.params.id,
      req.body
    );
    res.json(updatedDiary);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar resumo", error });
  }
};

export const deleteClassDiary = async (req: Request, res: Response) => {
  try {
    await classDiaryService.deleteClassDiary(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar resumo", error });
  }
};
