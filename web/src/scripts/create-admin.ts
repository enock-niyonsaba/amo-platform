import bcrypt from 'bcryptjs';

import { prisma } from '@/lib/prisma';

async function main() {
  const hashedPassword = await bcrypt.hash('Enock55@', 10);

  const user = await prisma.user.upsert({
    where: { email: 'enockccg28@gmail.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'enockccg28@gmail.com',
      name: 'Enock NIYONSABA',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('User created/updated:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 