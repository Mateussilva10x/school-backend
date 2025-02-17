import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 🔹 Buscar professores (com nome da matéria)
export const getFilteredTeachers = async (refSubject?: string) => {
  return await prisma.teacher.findMany({
    where: {
      refSubject: refSubject || undefined
    },
    include: { subject: true } // ✅ Agora essa linha funcionará
  });
};

// 🔹 Buscar professor por ID
export const getTeacherById = async (id: string) => {
  return await prisma.teacher.findUnique({
    where: { id },
    include: { subject: true }
  });
};

// 🔹 Criar um novo professor (agora sem `schoolYear`)
export const createTeacher = async (newTeacher: { name: string; birthDate: string; refSubject: string }) => {
  return await prisma.teacher.create({
    data: {
      name: newTeacher.name,
      birthDate: new Date(newTeacher.birthDate), // ✅ Converte para Date
      refSubject: newTeacher.refSubject
    }
  });
};

// 🔹 Atualizar um professor existente
export const updateTeacher = async (id: string, teacherData: Partial<{ name: string; birthDate: string; refSubject: string }>) => {
  return await prisma.teacher.update({
    where: { id },
    data: teacherData
  });
};

// 🔹 Deletar professor
export const deleteTeacher = async (id: string) => {
  return await prisma.teacher.delete({
    where: { id }
  });
};
