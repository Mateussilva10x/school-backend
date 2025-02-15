import { Subject } from '../models/Subject';

let subjects: Subject[] = [
  { id: '1', name: 'Português' },
  { id: '2', name: 'Matemática' },
  { id: '3', name: 'Ciências' },
  { id: '4', name: 'Geografia' },
  { id: '5', name: 'História' },
  { id: '6', name: 'Filosofia' },
  { id: '7', name: 'Artes' },
  { id: '8', name: 'Inglês' },
  { id: '9', name: 'Ed. Física' }
];

export const getAllSubjects = (): Subject[] => subjects;

export const getSubjectById = (id: string): Subject | undefined =>
  subjects.find(subject => subject.id === id);

export const createSubject = (newSubject: Omit<Subject, 'id'>): Subject => {
  const newItem: Subject = { ...newSubject, id: (subjects.length + 1).toString() };
  subjects.push(newItem);
  return newItem;
};

export const updateSubject = (id: string, subjectData: Partial<Subject>): Subject | undefined => {
  const index = subjects.findIndex(subject => subject.id === id);
  if (index !== -1) {
    subjects[index] = { ...subjects[index], ...subjectData };
    return subjects[index];
  }
  return undefined;
};

export const deleteSubject = (id: string): boolean => {
  const initialLength = subjects.length;
  subjects = subjects.filter(subject => subject.id !== id);
  return subjects.length < initialLength;
};
