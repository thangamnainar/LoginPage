import { UserService } from './user.service';
import { Request, Response } from 'express';
import { MailerService } from 'src/mailer.service';
export declare class UserController {
    private readonly userService;
    private mailerService;
    constructor(userService: UserService, mailerService: MailerService);
    create(req: Request, res: Response, createUserDto: any): Promise<Response<any, Record<string, any>>>;
    findAll(): string;
    findOne(id: string): string;
    update(req: Request, res: Response, updateUserDto: any): Promise<Response<any, Record<string, any>>>;
    login(req: Request, res: Response, loginUserDto: any): Promise<Response<any, Record<string, any>>>;
    remove(id: string): string;
}
