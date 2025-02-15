import { Teacher } from '../models/Teacher';
import { getSubjectById } from './subjectService';

let teachers: Teacher[] = [
  { id: '1', name: 'Maria Oliveira', birthDate: '1985-03-10', refSubject: '1' },
  { id: '2', name: 'João Santos', birthDate: '1982-07-15', refSubject: '2' },
  { id: '3', name: 'Ana Silva', birthDate: '1988-11-22', refSubject: '3' }
];

export const getFilteredTeachers = (refSubject?: string): Teacher[] => {
  return teachers.filter(teacher =>
    (!refSubject || teacher.refSubject === refSubject)
  );
};

export const getTeacherById = (id: string): Teacher | undefined => {
  const teacher = teachers.find(t => t.id === id);
  return teacher ? { ...teacher, refSubject: getSubjectById(teacher.refSubject)?.name || 'Desconhecido' } : undefined;
};

export const createTeacher = (newTeacher: Omit<Teacher, 'id'>): Teacher => {
  const newItem: Teacher = { ...newTeacher, id: (teachers.length + 1).toString() };
  teachers.push(newItem);
  return newItem;
};

export const updateTeacher = (id: string, teacherData: Partial<Teacher>): Teacher | undefined => {
  const index = teachers.findIndex(teacher => teacher.id === id);
  if (index !== -1) {
    teachers[index] = { ...teachers[index], ...teacherData };
    return teachers[index];
  }
  return undefined;
};

export const deleteTeacher = (id: string): boolean => {
  const initialLength = teachers.length;
  teachers = teachers.filter(teacher => teacher.id !== id);
  return teachers.length < initialLength;
};
