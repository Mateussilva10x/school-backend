import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBimesters = async () => {
  return await prisma.bimester.findMany();
};
