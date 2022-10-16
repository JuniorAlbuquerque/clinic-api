"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../../config/auth"));
const AuthValidator = ({ context }) => {
    const authHeader = context.token;
    if (!authHeader) {
        return false;
    }
    const [_, token] = authHeader.split(' ');
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, auth_1.default.jwt.secret);
        return !!decoded;
    }
    catch (error) {
        return false;
    }
};
exports.AuthValidator = AuthValidator;
