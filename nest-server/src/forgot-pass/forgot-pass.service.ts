import { Injectable } from '@nestjs/common';
import { CreateForgotPassDto } from './dto/create-forgot-pass.dto';
import { UpdateForgotPassDto } from './dto/update-forgot-pass.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ForgotPass } from './entities/forgot-pass.entity';

@Injectable()
export class ForgotPassService {

  constructor(
    @InjectRepository(ForgotPass)
    private forgotPassRepository: Repository<ForgotPass>,
  ) {}

  create(createForgotPassDto: CreateForgotPassDto) {
    return 'This action adds a new forgotPass';
  }

  async checkEmail(email: string) {
    return await this.forgotPassRepository.findOne({where: {email:email},select: ['id','email']}) ;
  }

  async updateVerificationCode(id: number, updateUserDto: any) {
    return await this.forgotPassRepository.update(id,updateUserDto);
  }

  findAll() {
    return `This action returns all forgotPass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forgotPass`;
  }

  update(id: number, updateForgotPassDto: UpdateForgotPassDto) {
    return `This action updates a #${id} forgotPass`;
  }

  remove(id: number) {
    return `This action removes a #${id} forgotPass`;
  }
}
