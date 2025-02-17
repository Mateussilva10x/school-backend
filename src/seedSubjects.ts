import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const subjects = [
  { id: '1', name: 'Matemática' },
  { id: '2', name: 'Português' },
  { id: '3', name: 'Ciências' },
  { id: '4', name: 'História' },
  { id: '5', name: 'Geografia' },
  { id: '6', name: 'Ed. Física' },
  { id: '7', name: 'Artes' },
  { id: '8', name: 'Filosofia' },
  { id: '9', name: 'Inglês' }
];

const seedSubjects = async () => {
  try {
    console.log('🔹 Cadastrando matérias no banco de dados...');

    for (const subject of subjects) {
      await prisma.subject.upsert({
        where: { id: subject.id },
        update: {},
        create: {
          id: subject.id,
          name: subject.name
        }
      });
    }

    console.log('✅ Matérias cadastradas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao cadastrar matérias:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedSubjects();
