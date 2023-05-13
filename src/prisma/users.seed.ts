import { hashPassword } from '../utils/hashPassword';
import { PrismaService } from './prisma.service';

const prisma = new PrismaService();

const users = [
  {
    name: 'Alice',
    email: 'alice@example.com',
    password: 'password123',
    isAdmin: false,
  },
  {
    name: 'Bob',
    email: 'bob@example.com',
    password: 'password456',
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password1',
    isAdmin: true,
  },
  {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    password: 'password2',
    isAdmin: false,
  },
  // add more users as needed
];

async function seedUsers() {
  for (const user of users) {
    await prisma.user.create({
      data: { ...user, password: await hashPassword('password123') },
    });
  }
}

async function seedDatabase() {
  try {
    await seedUsers();
    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
