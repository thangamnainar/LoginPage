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
    return await this.userRepository.findOne({where: {email:email},select: ['id','email','password','isVerified']}) ;
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

  updateVerificationCode(id: number, createUserDto: any) {
    return this.userRepository.update(id,createUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
