import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getFilteredStudents = async (name?: string, classId?: string, schoolYear?: string) => {
  return await prisma.student.findMany({
    where: {
      name: name ? { contains: name, mode: 'insensitive' } : undefined,
      refClass: classId || undefined,
      schoolYear: schoolYear || undefined
    }
  });
};

export const getStudentsByClass = async (classId: string) => {
  return await prisma.student.findMany({
    where: { refClass: classId }
  });
};

export const getStudentById = async (id: string) => {
  const student = await prisma.student.findUnique({
    where: { id }
  });

  if (!student) return null;

  return {
    ...student,
    birthDate: student.birthDate.toISOString().split('T')[0]
  };
};

export const createStudent = async (newStudent: { name: string; birthDate: Date; refClass: string; schoolYear: string }) => {
  return await prisma.student.create({
    data: newStudent
  });
};

export const updateStudent = async (id: string, updatedStudent: Partial<{ name: string; birthDate: Date; refClass: string; schoolYear: string }>) => {
  return await prisma.student.update({
    where: { id },
    data: updatedStudent
  });
};

export const deleteStudent = async (id: string) => {
  return await prisma.student.delete({
    where: { id }
  });
};
