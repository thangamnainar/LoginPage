import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { MailerService } from 'src/mailer.service';
export declare class UserController {
    private readonly userService;
    private mailerService;
    constructor(userService: UserService, mailerService: MailerService);
    createUser(req: Request, res: Response, createUserDto: any): Promise<Response<any, Record<string, any>>>;
    findAll(): string;
    findOne(id: string): string;
    verifyOTP(req: Request, res: Response, updateUserDto: any): Promise<Response<any, Record<string, any>>>;
    login(req: Request, res: Response, loginUserDto: any): Promise<Response<any, Record<string, any>>>;
    forgotPassword(req: Request, res: Response, forgotPasswordDto: any): Promise<Response<any, Record<string, any>>>;
    verifyOtpForgotPassword(req: Request, res: Response, updateUserDto: UpdateUserDto): Promise<Response<any, Record<string, any>>>;
    resetPassword(req: Request, res: Response, resetPasswordDto: any): Promise<Response<any, Record<string, any>>>;
    remove(id: string): string;
}
