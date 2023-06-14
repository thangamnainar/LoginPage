import { Module } from '@nestjs/common';
import { ForgotPassService } from './forgot-pass.service';
import { ForgotPassController } from './forgot-pass.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForgotPass } from './entities/forgot-pass.entity';
import { MailerService } from 'src/mailer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ForgotPass
    ]),
  ],
  controllers: [ForgotPassController],
  providers: [ForgotPassService,MailerService]
})
export class ForgotPassModule {}
