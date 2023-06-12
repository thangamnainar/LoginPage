import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { MailerService } from 'src/mailer.service';
import * as bcrypt from 'bcrypt';
// import { log } from 'console';
// import { verify } from 'crypto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private mailerService: MailerService) { }

  @Post('createUser')
  async create(@Req() req: Request, @Res() res: Response, @Body() createUserDto: any) {
    try {
      let email = createUserDto.email;
      let password = createUserDto.password;
      const checkEmail = await this.userService.checkEmail(email);
      // console.log(checkEmail.isVerified);

      if (checkEmail) {
        if (checkEmail.isVerified == 1) {
          return res.status(HttpStatus.OK).json({ message: 'Email verified' });
        } else {
          const verifyCode = this.mailerService.generateVerificationCode();
          this.userService.updateVerificationCode(checkEmail.id, { verification_code: verifyCode });
          await this.mailerService.sendMail(email, 'Verify Email', `Please verify your email ${verifyCode}`);
          console.log('Email sent');
          return res.status(HttpStatus.OK).json({ message: 'Email not verified', result: 'verifyCode send Your Email' });
        }
        return res.status(HttpStatus.OK).json({ message: 'Email already exists' });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        createUserDto.password = hashPassword;
        createUserDto.verification_code = this.mailerService.generateVerificationCode();
        const userCreated = await this.userService.createUser(createUserDto);
        await this.mailerService.sendMail(email, 'Verify Email', `Please verify your email ${ createUserDto.verification_code }`);
        // console.log(userCreated);        
        return res.status(HttpStatus.OK).json({ message: 'Email not exists' ,res:'userCreated'});
      }
    } catch (err) {
      console.log(err);
    }
    // return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.updateVerificationCode(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
