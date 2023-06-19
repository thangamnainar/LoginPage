"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const mailer_service_1 = require("../mailer.service");
const swagger_1 = require("@nestjs/swagger");
const bcrypt = require("bcrypt");
let UserController = exports.UserController = class UserController {
    constructor(userService, mailerService) {
        this.userService = userService;
        this.mailerService = mailerService;
    }
    async createUser(req, res, createUserDto) {
        try {
            let email = createUserDto.email;
            let password = createUserDto.password;
            const checkEmail = await this.userService.checkEmail(email);
            if (checkEmail) {
                if (checkEmail.isVerified == 1) {
                    return res.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({ message: 'Something went wrong', status: false });
                }
                else {
                    const verifyCode = this.mailerService.generateVerificationCode();
                    let generateOtpTime = Date.now();
                    const hashPassword = await bcrypt.hash(password, 10);
                    await this.userService.updateVerificationCode(checkEmail.id, { verification_code: verifyCode, password: hashPassword, attempt_Time: generateOtpTime });
                    await this.mailerService.sendMail(email, 'Verify Email', `Please verify your email ${verifyCode}`);
                    console.log('Email sent');
                    return res.status(common_1.HttpStatus.OK).json({ message: 'Check Your Mail', status: true });
                }
            }
            else {
                const hashPassword = await bcrypt.hash(password, 10);
                createUserDto.password = hashPassword;
                const userCreated = await this.userService.createUser(createUserDto);
                const verification_code = this.mailerService.generateVerificationCode();
                let generateOtpTime = Date.now();
                await this.userService.updateVerificationCode(userCreated.id, { verification_code: verification_code, attempt_Time: generateOtpTime });
                await this.mailerService.sendMail(email, 'Verify Email', `Please verify your email ${verification_code}`);
                console.log(userCreated);
                return res.status(common_1.HttpStatus.OK).json({ message: 'user created', status: true });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async verifyOTP(req, res, updateUserDto) {
        try {
            let email = updateUserDto.email;
            let verifyotp = updateUserDto.verifyotp;
            let maxTime = 1 * 60 * 1000;
            const checkEmail = await this.userService.checkEmail(email);
            if (checkEmail) {
                let currentTime = Date.now();
                console.log(currentTime - +checkEmail.attempt_Time, '""""""""""""""""""""""""""');
                if (+checkEmail.verification_code === +verifyotp) {
                    if ((currentTime - +checkEmail.attempt_Time) < maxTime) {
                        this.userService.updateVerificationCode(checkEmail.id, { isVerified: 1, verification_code: null, attempt_Time: null });
                        return res.status(common_1.HttpStatus.OK).json({ message: 'Account Verified', status: true });
                    }
                    else {
                        return res.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({ message: ' OTP Expired', status: false });
                    }
                }
                else {
                    return res.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({ message: 'Invalid OTP', status: false });
                }
            }
            else {
                return res.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({ message: 'Email not ex ists', status: false });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async login(req, res, loginUserDto) {
        try {
            let email = loginUserDto.email;
            let password = loginUserDto.password;
            const checkEmail = await this.userService.checkEmail(email);
            let maxTime = 1 * 60 * 1000;
            if (checkEmail && checkEmail.isVerified == 1) {
                const match = await bcrypt.compare(password, checkEmail.password);
                if (match) {
                    if (checkEmail.attempt_Count < 3) {
                        await this.userService.updateAttemptCount(checkEmail.id, { attempt_Count: 0, attempt_Time: null });
                        return res.status(common_1.HttpStatus.OK).json({ message: 'login success', status: true });
                    }
                    else {
                        let current_Time = Date.now();
                        if ((current_Time - +checkEmail.attempt_Time) > maxTime) {
                            await this.userService.updateAttemptCount(checkEmail.id, { attempt_Count: 0, attempt_Time: null });
                            console.log('un Block');
                            return res.status(common_1.HttpStatus.OK).json({ message: 'Login Success', status: true });
                        }
                        console.log('blocked');
                        return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Your Too many long incorrect password', status: false });
                    }
                }
                else {
                    const attempt_Time = Date.now();
                    let thrrottleCount = checkEmail.attempt_Count;
                    await this.userService.updateAttemptCount(checkEmail.id, { attempt_Count: thrrottleCount + 1, attempt_Time: attempt_Time });
                    console.log('password not match');
                    return res.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({ message: 'invalid user Or password', status: false });
                }
            }
            else {
                return res.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({ message: 'invalid user Or password', status: false });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async forgotPassword(req, res, forgotPasswordDto) {
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
                return res.status(common_1.HttpStatus.OK).json({ message: 'Check Your Mail', status: true });
            }
            else {
                return res.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({ message: 'Something went wrong ', status: false });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async verifyOtpForgotPassword(req, res, updateUserDto) {
        try {
            let email = updateUserDto.email;
            let verifyotp = updateUserDto.verifyotp;
            let maxTime = 1 * 60 * 1000;
            let current_Time2 = Date.now();
            const checkEmail = await this.userService.checkEmail(email);
            if (checkEmail) {
                if (+checkEmail.verification_code === +(verifyotp)) {
                    if ((current_Time2 - +checkEmail.attempt_Time) < maxTime) {
                        return res.status(common_1.HttpStatus.OK).json({ message: 'otp verified', status: true });
                    }
                    else {
                        console.log(+checkEmail.attempt_Time);
                        return res.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({ message: 'OTP Expired', status: false });
                    }
                }
                else {
                    return res.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({ message: 'Invalid OTP', status: false });
                }
            }
            else {
                return res.status(common_1.HttpStatus.OK).json({ message: 'Email not ex ists', status: false });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async resetPassword(req, res, resetPasswordDto) {
        try {
            let email = resetPasswordDto.email;
            let verifyotp = resetPasswordDto.otp;
            let password = resetPasswordDto.password;
            const checkEmail = await this.userService.checkEmail(email);
            if (checkEmail) {
                if (+checkEmail.verification_code === +verifyotp) {
                    const hash = await bcrypt.hash(password, 10);
                    this.userService.updatePassword(checkEmail.id, { verification_code: null, password: hash });
                    this.userService.updateVerificationCode(checkEmail.id, { verification_code: null });
                    return res.status(common_1.HttpStatus.OK).json({ message: 'Reset password successfully', status: true });
                }
                else {
                    return res.status(common_1.HttpStatus.OK).json({ message: 'invalid otp', status: false });
                }
            }
            else {
                return res.status(common_1.HttpStatus.OK).json({ message: 'Email not ex ists', status: false });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async signUpReSendMail(req, res, reSendMailDto) {
        try {
            let email = reSendMailDto.email;
            console.log(email);
            const checkEmail = await this.userService.checkEmail(email);
            if (checkEmail) {
                const verifyCode = this.mailerService.generateVerificationCode();
                let generateOtpTime = Date.now();
                await this.userService.updateVerificationCode(checkEmail.id, { verification_code: verifyCode, attempt_Time: generateOtpTime });
                await this.mailerService.sendMail(email, 'Verify Email', `Please verify your email ${verifyCode}`);
                console.log('Email sent');
                return res.status(common_1.HttpStatus.OK).json({ message: 'Check Your Mail', status: true });
            }
            else {
                return res.status(common_1.HttpStatus.OK).json({ message: 'some thing wrong', status: false });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async reSendMail(req, res, reSendMailDto) {
        try {
            let email = reSendMailDto.email;
            console.log(email);
            const checkEmail = await this.userService.checkEmail(email);
            if (checkEmail && checkEmail.isVerified == 1) {
                const verifyCode = this.mailerService.generateVerificationCode();
                let generateOtpTime = Date.now();
                await this.userService.updateVerificationCode(checkEmail.id, { verification_code: verifyCode, attempt_Time: generateOtpTime });
                await this.mailerService.sendMail(email, 'Verify Email', `Please verify your email ${verifyCode}`);
                console.log('Email sent');
                return res.status(common_1.HttpStatus.OK).json({ message: 'Check Your Mail', status: true });
            }
            else {
                return res.status(common_1.HttpStatus.OK).json({ message: 'some thing wrong', status: false });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    remove(id) {
        return this.userService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)('createUser'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)('verifyOtp'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyOTP", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('getMail'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Put)('verifyOtpForgotPassword'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyOtpForgotPassword", null);
__decorate([
    (0, common_1.Put)('resetPassword'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Put)('signUpReSendMail'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUpReSendMail", null);
__decorate([
    (0, common_1.Put)('reSendMail'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "reSendMail", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, mailer_service_1.MailerService])
], UserController);
//# sourceMappingURL=user.controller.js.map