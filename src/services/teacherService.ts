import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getFilteredTeachers = async (refSubject?: string) => {
  return await prisma.teacher.findMany({
    where: {
      refSubject: refSubject || undefined
    },
    include: { subject: true }
  });
};

export const getTeacherById = async (id: string) => {
  return await prisma.teacher.findUnique({
    where: { id },
    include: { subject: true }
  });
};

export const createTeacher = async (newTeacher: { name: string; birthDate: string; refSubject: string }) => {
  return await prisma.teacher.create({
    data: {
      name: newTeacher.name,
      birthDate: new Date(newTeacher.birthDate),
      refSubject: newTeacher.refSubject
    }
  });
};

export const updateTeacher = async (id: string, teacherData: Partial<{ name: string; birthDate: string; refSubject: string }>) => {
  return await prisma.teacher.update({
    where: { id },
    data: teacherData
  });
};

export const deleteTeacher = async (id: string) => {
  return await prisma.teacher.delete({
    where: { id }
  });
};
