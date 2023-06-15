import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { MailerService } from 'src/mailer.service';
import { ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService, private mailerService: MailerService) { }

  @Post('createUser')
  async createUser(@Req() req: Request, @Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      let email = createUserDto.email;
      // console.log(email);      
      let password = createUserDto.password;
      const checkEmail = await this.userService.checkEmail(email);
      // console.log(checkEmail);    

      if (checkEmail) {
        if (checkEmail.isVerified == 1) {
          return res.status(HttpStatus.OK).json({ message: 'Email verified', res: true });
        } else {
          const verifyCode = this.mailerService.generateVerificationCode();
          const hashPassword = await bcrypt.hash(password, 10);
          await this.userService.updateVerificationCode(checkEmail.id, { verification_code: verifyCode, password: hashPassword });
          // console.log("email",email);          
          await this.mailerService.sendMail(email, 'Verify Email', `Please verify your email ${verifyCode}`);
          console.log('Email sent');
          return res.status(HttpStatus.OK).json({ message: 'Email not verified', result: 'verifyCode send Your Email' });
        }
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        createUserDto.password = hashPassword;
        const userCreated = await this.userService.createUser(createUserDto);
        const verification_code = this.mailerService.generateVerificationCode();
        await this.userService.updateVerificationCode(userCreated.id, { verification_code: verification_code });
        await this.mailerService.sendMail(email, 'Verify Email', `Please verify your email ${verification_code}`);
        console.log(userCreated);
        return res.status(HttpStatus.OK).json({ message: 'user created', res: false });
      }
    } catch (err) {
      console.log(err);
    }
  }


  @Put('verifyOtp')
  async verifyOTP(@Req() req: Request, @Res() res: Response, @Body() updateUserDto: UpdateUserDto) {
    try {
      let email = updateUserDto.email;
      let verifyotp = updateUserDto.verifyotp;
      console.log(email, verifyotp);
      // console.log(updateUserDto);
      const checkEmail = await this.userService.checkEmail(email);
      if (checkEmail) {
        if (parseInt(checkEmail.verification_code) === parseInt(verifyotp)) {
          this.userService.updateVerificationCode(checkEmail.id, { isVerified: 1, verification_code: null });
          return res.status(HttpStatus.OK).json({ message: 'otp verified', res: false });
        } else {
          return res.status(HttpStatus.OK).json({ message: 'invalid otp', res: true });
        }
      } else {
        return res.status(HttpStatus.OK).json({ message: 'Email not ex ists', res: true });
      }
    } catch (err) {
      console.log(err);
    }
  }



  @Post('login')
  async login(@Req() req: Request, @Res() res: Response, @Body() loginUserDto: CreateUserDto) {
    try {
      let email = loginUserDto.email;
      let password = loginUserDto.password;
      // console.log(email, password);
      const checkEmail = await this.userService.checkEmail(email);
      console.log(checkEmail);
      let maxTime = 1 * 60 * 1000;
      if (checkEmail && checkEmail.isVerified == 1) {
        if (checkEmail.attempt_Count < 3) {
          const match = await bcrypt.compare(password, checkEmail.password);
          if (match) {
            await this.userService.update_Attempt_Count(checkEmail.id, { attempt_Count: 0, attempt_Time: null });
            return res.status(HttpStatus.OK).json({ message: 'login success', res: false });
          } else {
            const attempt_Time = Date.now();
            // console.log(attempt_Time);
            let thrrottleCount = checkEmail.attempt_Count;
            await this.userService.update_Attempt_Count(checkEmail.id, { attempt_Count: thrrottleCount + 1, attempt_Time: attempt_Time });
            console.log('password not match');
            return res.status(HttpStatus.OK).json({ message: 'invalid password', res: true });
          }
        } else {
          let current_Time = Date.now();
          if ((current_Time - +checkEmail.attempt_Time) > maxTime) {
            await this.userService.update_Attempt_Count(checkEmail.id, { attempt_Count: 0, attempt_Time: null });
            console.log('un Block');
            return res.status(HttpStatus.OK).json({ message: 'unBlock Login Success', res: false });
          }
          return res.status(HttpStatus.OK).json({ message: 'Blocked', res: true });
        }
      } else {
        // const attempt_Time = Date.now();
        // await this.userService.update_Attempt_Count(checkEmail.id, { attempt_Count: thrrottleCount + 1, attempt_Time: attempt_Time });
        // console.log('email not exists');
        return res.status(HttpStatus.OK).json({ message: 'invalid user Or password', res: true });
      }
    } catch (err) {
      console.log(err);
    }
  }



  @Post('getMail')
  async forgotPassword(@Req() req: Request, @Res() res: Response, @Body() forgotPasswordDto: CreateUserDto) {
    try {
      let email = forgotPasswordDto.email;
      console.log(email);
      const checkEmail = await this.userService.checkEmail(email);
      if (checkEmail && checkEmail.isVerified == 1) {
        const verifyCode = this.mailerService.generateVerificationCode();
        let generateOtpTime = Date.now();
        await this.userService.updateVerificationCode(checkEmail.id, { verification_code: verifyCode, attempt_Time: generateOtpTime });
        await this.mailerService.sendMail(email, 'Verify Email', `Please verify your email ${verifyCode}`);
        console.log('Email sent');
        return res.status(HttpStatus.OK).json({ message: 'Email sent', result: false });
      } else {
        return res.status(HttpStatus.OK).json({ message: 'some thing wrong', result: true });
      }
    } catch (err) {
      console.log(err);
    }
  }


  @Put('verifyOtpForgotPassword')
  async verifyOtpForgotPassword(@Req() req: Request, @Res() res: Response, @Body() updateUserDto: UpdateUserDto) {
    try {
      let email = updateUserDto.email;
      let verifyotp = updateUserDto.verifyotp;
      // console.log(updateUserDto);
      let maxTime = 1 * 60 * 1000;
      let current_Time2 = Date.now();
      // console.log(current_Time2);
      
      const checkEmail = await this.userService.checkEmail(email);
      if (checkEmail) {
        if ((current_Time2 - +checkEmail.attempt_Time) < maxTime) {
          // console.log(+checkEmail.attempt_Time);          
          if (parseInt(checkEmail.verification_code) === parseInt(verifyotp)) {
            return res.status(HttpStatus.OK).json({ message: 'otp verified', result: false });
          } else {
            return res.status(HttpStatus.OK).json({ message: 'invalid otp', result: true });
          }
        }else{
          console.log(+checkEmail.attempt_Time);
          return res.status(HttpStatus.OK).json({ message: 'otp expired', result: true });
        }
      } else {
        return res.status(HttpStatus.OK).json({ message: 'Email not ex ists', result: true });
      }
    } catch (err) {
      console.log(err);
    }
  }



  @Put('resetPassword')
  async resetPassword(@Req() req: Request, @Res() res: Response, @Body() resetPasswordDto: UpdateUserDto) {
    try {
      let email = resetPasswordDto.email;
      let verifyotp = resetPasswordDto.otp;
      let password = resetPasswordDto.password;
      // console.log(resetPasswordDto, verifyotp);
      const checkEmail = await this.userService.checkEmail(email);
      if (checkEmail) {
        if (+checkEmail.verification_code === +verifyotp) {
          const hash = await bcrypt.hash(password, 10);
          this.userService.updatePassword(checkEmail.id, { verification_code: null, password: hash });
          this.userService.updateVerificationCode(checkEmail.id, { verification_code: null });
          return res.status(HttpStatus.OK).json({ message: 'update pass successfully', result: false });
        } else {
          return res.status(HttpStatus.OK).json({ message: 'invalid otp', result: true });
        }
      } else {
        return res.status(HttpStatus.OK).json({ message: 'Email not ex ists', result: true });
      }

    } catch (err) {
      console.log(err);
    }
  }

  @Put('reSendMail')
  async reSendMail(@Req() req: Request, @Res() res: Response, @Body() reSendMailDto: UpdateUserDto) {
    try {
      let email = reSendMailDto.email;
      const checkEmail = await this.userService.checkEmail(email);
      if (checkEmail && checkEmail.isVerified == 1) {
        const verifyCode = this.mailerService.generateVerificationCode();
        let generateOtpTime = Date.now();
        await this.userService.updateVerificationCode(checkEmail.id, { verification_code: verifyCode, attempt_Time: generateOtpTime });
        await this.mailerService.sendMail(email, 'Verify Email', `Please verify your email ${verifyCode}`);
        console.log('Email sent');
        return res.status(HttpStatus.OK).json({ message: 'Email sent', result: false });
      } else {
        return res.status(HttpStatus.OK).json({ message: 'some thing wrong', result: true });
      }
    } catch (err) {
      console.log(err);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
