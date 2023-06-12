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
const mailer_service_1 = require("../mailer.service");
const bcrypt = require("bcrypt");
let UserController = exports.UserController = class UserController {
    constructor(userService, mailerService) {
        this.userService = userService;
        this.mailerService = mailerService;
    }
    async create(req, res, createUserDto) {
        try {
            let email = createUserDto.email;
            let password = createUserDto.password;
            const checkEmail = await this.userService.checkEmail(email);
            if (checkEmail) {
                if (checkEmail.isVerified == 1) {
                    return res.status(common_1.HttpStatus.OK).json({ message: 'Email verified' });
                }
                else {
                    const verifyCode = this.mailerService.generateVerificationCode();
                    this.userService.updateVerificationCode(checkEmail.id, { verification_code: verifyCode });
                    await this.mailerService.sendMail(email, 'Verify Email', `Please verify your email ${verifyCode}`);
                    console.log('Email sent');
                    return res.status(common_1.HttpStatus.OK).json({ message: 'Email not verified', result: 'verifyCode send Your Email' });
                }
                return res.status(common_1.HttpStatus.OK).json({ message: 'Email already exists' });
            }
            else {
                const hashPassword = await bcrypt.hash(password, 10);
                createUserDto.password = hashPassword;
                createUserDto.verification_code = this.mailerService.generateVerificationCode();
                const userCreated = await this.userService.createUser(createUserDto);
                await this.mailerService.sendMail(email, 'Verify Email', `Please verify your email ${createUserDto.verification_code}`);
                return res.status(common_1.HttpStatus.OK).json({ message: 'Email not exists', res: 'userCreated' });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    findAll() {
        return this.userService.findAll();
    }
    findOne(id) {
        return this.userService.findOne(+id);
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
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, mailer_service_1.MailerService])
], UserController);
//# sourceMappingURL=user.controller.js.map