import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardData = async () => {
  const totalStudents = await prisma.student.count();
  const totalTeachers = await prisma.teacher.count();
  const totalClasses = await prisma.class.count();

  return { totalStudents, totalTeachers, totalClasses };
};
