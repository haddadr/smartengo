import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'darkvador',
      password: 'skywalker',
      database: 'smartengo_db',
      synchronize: true,
      entities: [User],
      logging: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
