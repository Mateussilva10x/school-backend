import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 🔹 Filtrar alunos por nome, turma e ano letivo
export const getFilteredStudents = async (name?: string, classId?: string, schoolYear?: string) => {
  return await prisma.student.findMany({
    where: {
      name: name ? { contains: name, mode: 'insensitive' } : undefined,
      refClass: classId || undefined,
      schoolYear: schoolYear || undefined
    }
  });
};

// 🔹 Buscar alunos por turma
export const getStudentsByClass = async (classId: string) => {
  return await prisma.student.findMany({
    where: { refClass: classId }
  });
};

// 🔹 Buscar um aluno pelo ID
export const getStudentById = async (id: string) => {
  const student = await prisma.student.findUnique({
    where: { id }
  });

  if (!student) return null;

  return {
    ...student,
    birthDate: student.birthDate.toISOString().split('T')[0] // 🔹 Converte Date para string no formato YYYY-MM-DD
  };
};

// 🔹 Criar um novo aluno
export const createStudent = async (newStudent: { name: string; birthDate: Date; refClass: string; schoolYear: string }) => {
  return await prisma.student.create({
    data: newStudent
  });
};

// 🔹 Atualizar um aluno existente
export const updateStudent = async (id: string, updatedStudent: Partial<{ name: string; birthDate: Date; refClass: string; schoolYear: string }>) => {
  return await prisma.student.update({
    where: { id },
    data: updatedStudent
  });
};

// 🔹 Deletar um aluno
export const deleteStudent = async (id: string) => {
  return await prisma.student.delete({
    where: { id }
  });
};
