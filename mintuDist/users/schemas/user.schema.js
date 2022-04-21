"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ownerId: String,
});
class Users extends mongoose.Document {
}
exports.Users = Users;
//# sourceMappingURL=user.schema.js.map