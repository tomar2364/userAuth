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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(AuthData, jwtService) {
        this.AuthData = AuthData;
        this.jwtService = jwtService;
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
    async PasswordValidate(password, salt, UserPass) {
        const hash = await bcrypt.hash(UserPass, salt);
        return hash === password;
    }
    async validateUserPassword(authCredentialsDto) {
        const { UserName, password } = authCredentialsDto;
        const user = await this.AuthData.findOne({ userName: UserName });
        if (user &&
            (await this.PasswordValidate(user.password, user.salt, password))) {
            return user.userName;
        }
        else {
            return null;
        }
    }
    async signIn(authCredentialsDto) {
        const userName = await this.validateUserPassword(authCredentialsDto);
        if (!userName) {
            throw new common_1.UnauthorizedException('Invalid Credentials');
        }
        const payload = { userName };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }
    async signUp(authCredentialsDto) {
        const { UserName, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashPass = await this.hashPassword(password, salt);
        const user = new this.AuthData({
            userName: UserName,
            password: hashPass,
            salt: salt,
        });
        try {
            await user.save();
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.NotFoundException(`User with UserName => "${UserName}"already exisit`);
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Auth')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map