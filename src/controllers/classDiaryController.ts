import { Request, Response } from "express";
import * as classDiaryService from "../services/classDiaryService";

// 🔹 Buscar todos os resumos com filtros opcionais
export const getClassDiaries = async (req: Request, res: Response) => {
  try {
    const { refClass, refSubject, date } = req.query;
    const diaries = await classDiaryService.getClassDiaries(
      refClass as string,
      refSubject as string,
      date as string
    );
    res.json(diaries);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar resumos", error });
  }
};

// 🔹 Buscar um resumo pelo ID
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

// 🔹 Criar um novo resumo
export const createClassDiary = async (req: Request, res: Response) => {
  try {
    const newDiary = await classDiaryService.createClassDiary(req.body);
    res.status(201).json(newDiary);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar resumo", error });
  }
};

// 🔹 Atualizar um resumo existente
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

// 🔹 Deletar um resumo
export const deleteClassDiary = async (req: Request, res: Response) => {
  try {
    await classDiaryService.deleteClassDiary(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar resumo", error });
  }
};
