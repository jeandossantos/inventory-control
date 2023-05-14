import { hashPassword } from '../../utils/hashPassword';
import { PrismaService } from '../prisma.service';

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

export async function seedUsers(prisma: PrismaService) {
  for (const user of users) {
    await prisma.user.create({
      data: { ...user, password: await hashPassword('password123') },
    });
  }
}
