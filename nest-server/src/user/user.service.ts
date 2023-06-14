import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async checkEmail(email: string) {
    return await this.userRepository.findOne({where: {email:email},select: ['id','email','password','isVerified','verification_code','attempt_Count','attempt_Time']}) ;
  }

  async createUser(createUserDto: any) {        
    return await this.userRepository.save(createUserDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async updateVerificationCode(id: number, updateUserDto: any) {
    return await this.userRepository.update(id,updateUserDto);
  }

  async update_Attempt_Count(id:any,loginUserDto:any ){
    return await this.userRepository.update(id,loginUserDto)

  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
