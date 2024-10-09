import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { EmailUniqueValidator } from './middleware/email-is-unique.validator';

@Module({
  controllers: [UserController],
  providers: [UserService, EmailUniqueValidator],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
