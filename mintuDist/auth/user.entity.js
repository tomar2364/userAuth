"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.AuthSchema = void 0;
const mongoose = require("mongoose");
exports.AuthSchema = new mongoose.Schema({
    userName: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    salt: { type: String, require: false },
});
class Auth extends mongoose.Document {
}
exports.Auth = Auth;
//# sourceMappingURL=user.entity.js.map