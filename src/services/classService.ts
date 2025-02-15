import { Class } from '../models/Class';
import { getStudentsByClass } from './studentService';

let classes: Class[] = [
  { id: '1', name: 'Turma A', schoolYear: '2024' },
  { id: '2', name: 'Turma B', schoolYear: '2024' },
  { id: '3', name: 'Turma C', schoolYear: '2023' }
];

// 🔹 Função para calcular o total de alunos por turma
const calculateTotalStudents = (classId: string): number => {
  return getStudentsByClass(classId).length;
};

// 🔹 Retorna todas as turmas com o total de alunos
export const getFilteredClasses = (schoolYear?: string): Class[] => {
  return classes
    .filter(cls => (!schoolYear || cls.schoolYear === schoolYear))
    .map(cls => ({ ...cls, totalStudents: calculateTotalStudents(cls.id) }));
};

// 🔹 Busca uma turma pelo ID (com total de alunos)
export const getClassById = (id: string): Class | undefined => {
  const classItem = classes.find(c => c.id === id);
  return classItem ? { ...classItem, totalStudents: calculateTotalStudents(classItem.id) } : undefined;
};

// 🔹 Cria uma nova turma
export const createClass = (newClass: Omit<Class, 'id' | 'totalStudents'>): Class => {
  const newClassItem: Class = { ...newClass, id: (classes.length + 1).toString() };
  classes.push(newClassItem);
  return { ...newClassItem, totalStudents: calculateTotalStudents(newClassItem.id) };
};

// 🔹 Atualiza uma turma existente
export const updateClass = (id: string, classData: Partial<Omit<Class, 'totalStudents'>>): Class | undefined => {
  const index = classes.findIndex(c => c.id === id);
  if (index !== -1) {
    classes[index] = { ...classes[index], ...classData };
    return { ...classes[index], totalStudents: calculateTotalStudents(classes[index].id) };
  }
  return undefined;
};

// 🔹 Exclui uma turma
export const deleteClass = (id: string): boolean => {
  const initialLength = classes.length;
  classes = classes.filter(cls => cls.id !== id);
  return classes.length < initialLength;
};
