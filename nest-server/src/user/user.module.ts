import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MailerService } from 'src/mailer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ]),
    
  ],
  controllers: [UserController],
  providers: [UserService,MailerService,]
})
export class UserModule {}
