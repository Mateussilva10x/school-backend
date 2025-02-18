import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const bimesters = [
    "1º Bimestre",
    "2º Bimestre",
    "3º Bimestre",
    "4º Bimestre",
  ];

  for (const name of bimesters) {
    await prisma.bimester.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("Bimestres cadastrados com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
