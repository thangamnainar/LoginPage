import { Controller, Get, Post, Body, Patch, Param, Delete ,Req ,Res,HttpStatus} from '@nestjs/common';
import { ForgotPassService } from './forgot-pass.service';
import { CreateForgotPassDto } from './dto/create-forgot-pass.dto';
import { UpdateForgotPassDto } from './dto/update-forgot-pass.dto';
import { Request, Response } from 'express';
import { MailerService } from 'src/mailer.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('forgot-pass')

@ApiTags('forgot-pass')


export class ForgotPassController {
  constructor(private readonly forgotPassService: ForgotPassService,private mailerService:MailerService) {}

  @Post('getMail')
  async forgotPassword(@Req() req: Request, @Res() res: Response, @Body() CreateForgotPassDto: CreateForgotPassDto) {
    try {
      let email = CreateForgotPassDto.email;
      console.log(email);
      const checkEmail = await this.forgotPassService.checkEmail(email);
      if (checkEmail) {
        const verifyCode = this.mailerService.generateVerificationCode();
        await this.forgotPassService.updateVerificationCode(checkEmail.id, { verification_code: verifyCode });
        await this.mailerService.sendMail(email, 'Verify Email', `Please verify your email ${verifyCode}`);
        console.log('Email sent');
        return res.status(HttpStatus.OK).json({ result: 'verifyCode send Your Email' });
      } else {
        return res.status(HttpStatus.OK).json({ message: 'some thing wrong', res: true });
      }
    } catch (err) {
      console.log(err);
    }
  }

  @Get()
  findAll() {
    return this.forgotPassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forgotPassService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateForgotPassDto: UpdateForgotPassDto) {
    return this.forgotPassService.update(+id, updateForgotPassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forgotPassService.remove(+id);
  }
}
