import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    checkEmail(email: string): Promise<User>;
    createUser(createUserDto: any): Promise<any>;
    findAll(): string;
    findOne(id: number): string;
    updateVerificationCode(id: number, createUserDto: any): Promise<import("typeorm").UpdateResult>;
    remove(id: number): string;
}
