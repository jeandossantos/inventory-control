import { CreateProductData } from '../product/types/product.interface';
import { CreateUserData } from '../user/types/user.interface';
import { hashPassword } from '../utils/hashPassword';
import { PrismaService } from '../prisma/prisma.service';
import { generateUniqueCode } from './generateUniqueCode';

export async function createUser(prisma: PrismaService, user: CreateUserData) {
  const { name, email, password, isAdmin } = user;

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      isAdmin,
      password: await hashPassword(password),
    },
  });

  return newUser;
}

export async function createProduct(
  prisma: PrismaService,
  product: Omit<CreateProductData, 'code'>,
) {
  const { name, description, minStock, quantity, price, userId } = product;

  return await prisma.product.create({
    data: {
      name,
      description,
      code: generateUniqueCode(),
      minStock,
      currentQuantity: quantity,
      price,
      quantityIn: quantity,
      quantityOut: 0,

      Movement: {
        create: {
          moment: new Date(),
          unitPrice: price,
          type: 'in',
          quantity: quantity,
          userId,
        },
      },
    },
  });
}
