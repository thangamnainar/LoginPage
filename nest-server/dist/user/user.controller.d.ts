import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { MailerService } from 'src/mailer.service';
export declare class UserController {
    private readonly userService;
    private mailerService;
    constructor(userService: UserService, mailerService: MailerService);
    createUser(req: Request, res: Response, createUserDto: CreateUserDto): Promise<Response<any, Record<string, any>>>;
    verifyOTP(req: Request, res: Response, updateUserDto: UpdateUserDto): Promise<Response<any, Record<string, any>>>;
    login(req: Request, res: Response, loginUserDto: CreateUserDto): Promise<Response<any, Record<string, any>>>;
    forgotPassword(req: Request, res: Response, forgotPasswordDto: CreateUserDto): Promise<Response<any, Record<string, any>>>;
    verifyOtpForgotPassword(req: Request, res: Response, updateUserDto: UpdateUserDto): Promise<Response<any, Record<string, any>>>;
    resetPassword(req: Request, res: Response, resetPasswordDto: UpdateUserDto): Promise<Response<any, Record<string, any>>>;
    reSendMail(req: Request, res: Response, reSendMailDto: any): Promise<Response<any, Record<string, any>>>;
    remove(id: string): string;
}
