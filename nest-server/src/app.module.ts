import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MailerService } from './mailer.service';
import { UserModule } from './user/user.module';
import { ForgotPassModule } from './forgot-pass/forgot-pass.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,   
      database: process.env.DATABASE_NAME,
      synchronize: true,  
      autoLoadEntities: true,
    }),
    UserModule,
    ForgotPassModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailerService,],
})
export class AppModule {}
