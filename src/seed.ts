import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

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

const createAdminUser = async () => {
  const hashedPassword = bcrypt.hashSync("admin123", 10);

  await prisma.user.create({
    data: {
      email: "admin@school.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Usuário admin criado!");
};

createAdminUser();

const subjects = [
  { id: "1", name: "Matemática" },
  { id: "2", name: "Português" },
  { id: "3", name: "Ciências" },
  { id: "4", name: "História" },
  { id: "5", name: "Geografia" },
  { id: "6", name: "Ed. Física" },
  { id: "7", name: "Artes" },
  { id: "8", name: "Filosofia" },
  { id: "9", name: "Inglês" },
];

const seedSubjects = async () => {
  try {
    console.log("🔹 Cadastrando matérias no banco de dados...");

    for (const subject of subjects) {
      await prisma.subject.upsert({
        where: { id: subject.id },
        update: {},
        create: {
          id: subject.id,
          name: subject.name,
        },
      });
    }

    console.log("✅ Matérias cadastradas com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao cadastrar matérias:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedSubjects();
