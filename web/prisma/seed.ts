import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create initial super admin user
  const hashedPassword = await hash('Enock55@', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'enockccg28@gmail.com' },
    update: {},
    create: {
      email: 'enockccg28@gmail.com',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Log the creation of super admin
  await prisma.activity.create({
    data: {
      type: 'USER_CREATED',
      description: 'Initial super admin user created',
      userId: admin.id,
    },
  });

  console.log('Super admin user created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 