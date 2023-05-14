import { hashPassword } from '../../utils/hashPassword';
import { createProduct } from '../../utils/test-utils';
import { PrismaService } from './../prisma.service';

const products = [
  {
    name: 'Shampoo',
    description: 'Product description',
    quantity: 30,
    minStock: 3,
    price: '8.99',
  },
  {
    name: 'Conditioner',
    description: 'Product description',
    quantity: 40,
    minStock: 4,
    price: '7.50',
  },
  {
    name: 'Toothbrush',
    description: 'Product description',
    quantity: 100,
    minStock: 10,
    price: '3.99',
  },
  {
    name: 'Toothpaste',
    description: 'Product description',
    quantity: 70,
    minStock: 7,
    price: '2.99',
  },
  {
    name: 'Soap',
    description: 'Product description',
    quantity: 60,
    minStock: 6,
    price: '5.25',
  },
  {
    name: 'Hand sanitizer',
    description: 'Product description',
    quantity: 90,
    minStock: 9,
    price: '12.00',
  },
  {
    name: 'Mouthwash',
    description: 'Product description',
    quantity: 80,
    minStock: 8,
    price: '7.50',
  },
  {
    name: 'Deodorant',
    description: 'Product description',
    quantity: 50,
    minStock: 5,
    price: '6.99',
  },
  {
    name: 'Toilet paper',
    description: 'Product description',
    quantity: 120,
    minStock: 12,
    price: '15.50',
  },
  {
    name: 'Paper towel',
    description: 'Product description',
    quantity: 110,
    minStock: 11,
    price: '10.25',
  },
  {
    name: 'Razors',
    description: 'Product description',
    quantity: 40,
    minStock: 4,
    price: '8.75',
  },
  {
    name: 'Floss',
    description: 'Product description',
    quantity: 70,
    minStock: 7,
    price: '3.25',
  },
  {
    name: 'Mouth guard',
    description: 'Product description',
    quantity: 20,
    minStock: 2,
    price: '6.50',
  },
  {
    name: 'Sunscreen',
    description: 'Product description',
    quantity: 60,
    minStock: 6,
    price: '9.99',
  },
  {
    name: 'Lotion',
    description: 'Product description',
    quantity: 30,
    minStock: 3,
    price: '7.99',
  },
  {
    name: 'Lip balm',
    description: 'Product description',
    quantity: 40,
    minStock: 4,
    price: '2.50',
  },
  {
    name: 'Contact solution',
    description: 'Product description',
    quantity: 50,
    minStock: 5,
    price: '12.50',
  },
  {
    name: 'Hair gel',
    description: 'Product description',
    quantity: 80,
    minStock: 8,
    price: '6.99',
  },
  {
    name: 'Facial cleanser',
    description: 'Product description',
    quantity: 30,
    minStock: 3,
    price: '9.25',
  },
];

const user = {
  name: 'Seed dos Santos',
  email: 'seeded@example.com.br',
  password: 'password123',
  isAdmin: true,
};

export async function createProducts(prisma: PrismaService) {
  const userDB = await prisma.user.create({
    data: { ...user, password: await hashPassword('password123') },
  });

  for (const product of products) {
    await createProduct(prisma, { ...product, userId: userDB.id });
  }
}
