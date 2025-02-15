import { Grades } from '../models/Grades';

let grades: Grades[] = [];

// 🔹 Filtrar notas por turma, ano letivo, disciplina e bimestre
export const getGradesByFilters = (classId: string, schoolYear: string, subjectId: string, bimester: string): Grades[] => {
  return grades.filter(grade =>
    grade.refSubject === subjectId &&
    grade.refBimester === bimester &&
    grade.schoolYear === schoolYear
  );
};

// 🔹 Obter notas de um aluno
export const getGradesByStudent = (studentId: string, schoolYear: string): Grades[] => {
  return grades.filter(grade =>
    grade.refStudent === studentId &&
    grade.schoolYear === schoolYear
  );
};

// 🔹 Obter notas de um aluno em um bimestre
export const getGradesByStudentAndBimester = (studentId: string, bimester: string): Grades[] => {
  return grades.filter(grade =>
    grade.refStudent === studentId &&
    grade.refBimester === bimester
  );
};

// 🔹 Salvar ou atualizar uma nota
export const saveGrade = (grade: Omit<Grades, 'id' | 'average'>): Grades => {
  const existingIndex = grades.findIndex(g =>
    g.refStudent === grade.refStudent &&
    g.refSubject === grade.refSubject &&
    g.refBimester === grade.refBimester &&
    g.schoolYear === grade.schoolYear
  );

  const newGrade: Grades = {
    ...grade,
    id: existingIndex >= 0 ? grades[existingIndex].id : Math.random().toString(36).substring(7),
    average: calculateAverage(grade.p1, grade.p2)
  };

  if (existingIndex >= 0) {
    grades[existingIndex] = newGrade;
  } else {
    grades.push(newGrade);
  }

  return newGrade;
};

// 🔹 Calcular média das notas
export const calculateAverage = (p1: number, p2: number): number => {
  return (p1 + p2) / 2;
};
