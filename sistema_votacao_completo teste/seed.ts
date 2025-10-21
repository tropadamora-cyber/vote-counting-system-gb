import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando população da base de dados...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      name: 'Administrador',
      role: 'ADMIN',
    },
  });
  console.log('✓ Utilizador admin criado:', admin.email);

  // Create party leader
  const leaderPassword = await bcrypt.hash('leader123', 10);
  const leader = await prisma.user.upsert({
    where: { email: 'leader@example.com' },
    update: {},
    create: {
      email: 'leader@example.com',
      password: leaderPassword,
      name: 'Líder do Partido',
      role: 'PARTY_LEADER',
    },
  });
  console.log('✓ Líder do partido criado:', leader.email);

  // Create regional coordinators
  const coordinator1Password = await bcrypt.hash('coord123', 10);
  const coordinator1 = await prisma.user.upsert({
    where: { email: 'coordinator1@example.com' },
    update: {},
    create: {
      email: 'coordinator1@example.com',
      password: coordinator1Password,
      name: 'Coordenador Regional 1',
      role: 'REGIONAL_COORDINATOR',
    },
  });
  console.log('✓ Coordenador regional 1 criado:', coordinator1.email);

  // Create delegates
  const delegatePassword = await bcrypt.hash('delegate123', 10);
  const delegate1 = await prisma.user.upsert({
    where: { email: 'delegate1@example.com' },
    update: {},
    create: {
      email: 'delegate1@example.com',
      password: delegatePassword,
      name: 'Delegado 1',
      role: 'DELEGATE',
    },
  });
  console.log('✓ Delegado 1 criado:', delegate1.email);

  const delegate2 = await prisma.user.upsert({
    where: { email: 'delegate2@example.com' },
    update: {},
    create: {
      email: 'delegate2@example.com',
      password: delegatePassword,
      name: 'Delegado 2',
      role: 'DELEGATE',
    },
  });
  console.log('✓ Delegado 2 criado:', delegate2.email);

  // Create electoral circles (sample from Guinea-Bissau)
  const circles = [
    { name: 'Catió / Komo', region: 'Tombali', deputies: 7 },
    { name: 'Bedanda / Cacine / Quebo', region: 'Tombali', deputies: 3 },
    { name: 'Buba / Empada', region: 'Quinara', deputies: 4 },
    { name: 'Fulacunda / Tite', region: 'Quinara', deputies: 6 },
    { name: 'Bissorã', region: 'Oio', deputies: 3 },
    { name: 'Farim', region: 'Oio', deputies: 3 },
  ];

  const createdCircles = [];
  for (const circle of circles) {
    const created = await prisma.electoralCircle.upsert({
      where: { name: circle.name },
      update: {},
      create: circle,
    });
    createdCircles.push(created);
    console.log(`✓ Círculo eleitoral criado: ${created.name}`);
  }

  // Create parties
  const parties = [
    { name: 'Partido Africano para a Independência da Guiné e Cabo Verde', acronym: 'PAIGC' },
    { name: 'Movimento para Alternância Democrática', acronym: 'MADEM' },
    { name: 'Partido de Renovação Social', acronym: 'PRS' },
    { name: 'Assembleia do Povo Unido', acronym: 'APU' },
  ];

  const createdParties = [];
  for (const party of parties) {
    const created = await prisma.party.upsert({
      where: { acronym: party.acronym },
      update: {},
      create: party,
    });
    createdParties.push(created);
    console.log(`✓ Partido criado: ${created.name}`);
  }

  // Create voting assemblies for each circle
  for (const circle of createdCircles) {
    for (let i = 1; i <= 3; i++) {
      await prisma.votingAssembly.upsert({
        where: {
          name_circleId: {
            name: `Mesa ${i} - ${circle.name}`,
            circleId: circle.id,
          },
        },
        update: {},
        create: {
          name: `Mesa ${i} - ${circle.name}`,
          circleId: circle.id,
        },
      });
    }
    console.log(`✓ Assembleias de voto criadas para: ${circle.name}`);
  }

  // Assign delegates to circles
  await prisma.delegateAssignment.upsert({
    where: {
      userId_circleId: {
        userId: delegate1.id,
        circleId: createdCircles[0].id,
      },
    },
    update: {},
    create: {
      userId: delegate1.id,
      circleId: createdCircles[0].id,
    },
  });

  await prisma.delegateAssignment.upsert({
    where: {
      userId_circleId: {
        userId: delegate2.id,
        circleId: createdCircles[1].id,
      },
    },
    update: {},
    create: {
      userId: delegate2.id,
      circleId: createdCircles[1].id,
    },
  });

  console.log('✓ Delegados atribuídos aos círculos');

  console.log('\n✅ Base de dados populada com sucesso!');
  console.log('\nCredenciais de teste:');
  console.log('  Admin: admin@example.com / admin123');
  console.log('  Líder: leader@example.com / leader123');
  console.log('  Delegado 1: delegate1@example.com / delegate123');
  console.log('  Delegado 2: delegate2@example.com / delegate123');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

