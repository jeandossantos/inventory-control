import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { MovementModule } from './movement/movement.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { isAuthenticated } from './middleware/isAuthenticated';
import { UserController } from './user/user.controller';
import { MovementController } from './movement/movement.controller';
import { ProductController } from './product/product.controller';
import { isAdmin } from './middleware/isAdmin';

@Module({
  imports: [
    ProductModule,
    MovementModule,
    UserModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .forRoutes(UserController, MovementController, ProductController)
      .apply(isAdmin)
      .forRoutes(UserController);
  }
}
