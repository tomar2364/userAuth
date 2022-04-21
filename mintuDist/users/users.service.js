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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UsersService = class UsersService {
    constructor(userdata) {
        this.userdata = userdata;
    }
    async getUsers(req) {
        const result = await this.userdata.find().exec();
        const data = await result.filter((prod) => prod.ownerId === req.id);
        return data.map((prod) => ({ id: prod.id, name: prod.name }));
    }
    async getUserById(id, req) {
        const found = await this.userdata.findById(id).where('ownerId').equals(req.id);
        if (!found) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
        return found;
    }
    async deleteUserById(id, req) {
        await this.getUserById(id, req);
        await this.userdata.deleteOne({ id: id }).where('ownerId').equals(req.id);
    }
    async updateUser(id, Name, req) {
        const user = await this.getUserById(id, req);
        user.name = Name;
        await user.save();
        return user;
    }
    async createUser(createUserDto, req) {
        const { Name } = createUserDto;
        const user = new this.userdata({ name: Name, ownerId: req.id });
        const result = await user.save();
        return result.id;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Users')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map