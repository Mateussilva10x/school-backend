import { PrismaClient } from '@prisma/client';
import { getStudentsByClass } from './studentService';

const prisma = new PrismaClient();

export const calculateTotalStudents = async (classId: string): Promise<number> => {
  const students = await getStudentsByClass(classId);
  return students.length;
};

export const getFilteredClasses = async (schoolYear?: string) => {
  const classes = await prisma.class.findMany({
    where: schoolYear ? { schoolYear } : {}
  });

  return await Promise.all(
    classes.map(async (cls) => ({
      ...cls,
      totalStudents: await calculateTotalStudents(cls.id)
    }))
  );
};

export const getClassById = async (id: string) => {
  const classItem = await prisma.class.findUnique({ where: { id } });

  if (!classItem) return null;

  return {
    ...classItem,
    totalStudents: await calculateTotalStudents(classItem.id)
  };
};

export const createClass = async (newClass: { name: string; schoolYear: string }) => {
  return await prisma.class.create({
    data: newClass
  });
};

export const updateClass = async (id: string, classData: Partial<{ name: string; schoolYear: string }>) => {
  return await prisma.class.update({
    where: { id },
    data: classData
  });
};

export const deleteClass = async (id: string) => {
  return await prisma.class.delete({
    where: { id }
  });
};
