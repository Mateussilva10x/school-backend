import { Student } from '../models/Student';

let students: Student[] = [
  { id: '1', name: 'João Silva', birthDate: '2010-05-15', refClass: '1', schoolYear: '2024' },
  { id: '2', name: 'Maria Santos', birthDate: '2009-08-22', refClass: '1', schoolYear: '2024' },
  { id: '3', name: 'Pedro Oliveira', birthDate: '2010-03-10', refClass: '2', schoolYear: '2024' }
];

export const getFilteredStudents = (name?: string, classId?: string, schoolYear?: string): Student[] => {
  return students.filter(student =>
    (!name || student.name.toLowerCase().includes(name.toLowerCase())) &&
    (!classId || student.refClass === classId) &&
    (!schoolYear || student.schoolYear === schoolYear)
  );
};

export const getStudentsByClass = (classId: string): Student[] => {
  return students.filter(student => student.refClass === classId)
}

export const getStudentById = (id: string): Student | undefined =>
  students.find(student => student.id === id);

export const createStudent = (newStudent: Student): Student => {
  students.push(newStudent);
  return newStudent;
};

export const updateStudent = (id: string, updatedStudent: Student): Student | undefined => {
  const index = students.findIndex(student => student.id === id);
  if (index !== -1) {
    students[index] = { ...students[index], ...updatedStudent };
    return students[index];
  }
  return undefined;
};

export const deleteStudent = (id: string): boolean => {
  const initialLength = students.length;
  students = students.filter(student => student.id !== id);
  return students.length < initialLength;
};
