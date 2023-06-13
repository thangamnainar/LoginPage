import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, Put } from '@nestjs/common';
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

      if (checkEmail) {
        if (checkEmail.isVerified == 1) {
          return res.status(HttpStatus.OK).json({ message: 'Email verified' ,res:true});
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
        return res.status(HttpStatus.OK).json({ message: 'user created' ,res:false});
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

  @Put('verifyOtp')
  async update( @Req() req:Request,@Res() res:Response, @Body() updateUserDto: any) {
    try{
      let email = updateUserDto.email;
      let verifyotp = updateUserDto.verifyotp;
      console.log(email,verifyotp);  
      console.log(updateUserDto);
          
      const checkEmail = await this.userService.checkEmail(email);
      if (checkEmail) {
        if (parseInt(checkEmail.verification_code) === parseInt(verifyotp)) {
          this.userService.updateVerificationCode(checkEmail.id, { isVerified: 1 });
          return res.status(HttpStatus.OK).json({ message: 'otp verified',res:false});
        } else {
          return res.status(HttpStatus.OK).json({ message: 'invalid otp',res:true});
        }
        // return { message: 'Email already exists' };
      } else {
        return res.status(HttpStatus.OK).json({ message: 'Email not exists' ,res:true});
      }
    }catch  (err) {
      console.log(err);
    } 
    // return this.userService.updateVerificationCode(updateUserDto);
  }
  @Post('login')
  async login(@Req() req:Request,@Res() res:Response, @Body() loginUserDto: any) {
    try{
      let email = loginUserDto.email;
      let password = loginUserDto.password;
      console.log(email,password);
      
      const checkEmail = await this.userService.checkEmail(email);
      
      if (checkEmail) {
        if (checkEmail.isVerified == 1) {
          const match = await bcrypt.compare(password, checkEmail.password);
          if (match) {
            return res.status(HttpStatus.OK).json({ message: 'login success',res:false});
          } else {
            return res.status(HttpStatus.OK).json({ message: 'invalid password',res:true});
          }
        } else {
          return res.status(HttpStatus.OK).json({ message: 'Email not verified',res:true});
        }
        // return { message: 'Email already exists' };
      } else {
        return res.status(HttpStatus.OK).json({ message: 'invalid user Or pasword',res:true });
      }
    }catch  (err) {
      console.log(err);
    }
    // return this.userService.updateVerificationCode(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
