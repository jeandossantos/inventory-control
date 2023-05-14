import { PrismaService } from '../prisma.service';
import { createProducts } from './products.seed';
import { seedUsers } from './users.seed';

const prisma = new PrismaService();

try {
  createProducts(prisma);
  seedUsers(prisma);
  console.log('Database seeded successfully.');
} catch (error) {
  console.error('Error seeding database:', error);
} finally {
  prisma.$disconnect();
}
