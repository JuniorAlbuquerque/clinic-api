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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const bcryptjs_1 = require("bcryptjs");
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
const auth_1 = __importDefault(require("../../config/auth"));
const jsonwebtoken_1 = require("jsonwebtoken");
const Auth_1 = require("../../models/Auth");
let UserLoginData = class UserLoginData {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserLoginData.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserLoginData.prototype, "password", void 0);
UserLoginData = __decorate([
    (0, type_graphql_1.InputType)()
], UserLoginData);
let AuthResolver = class AuthResolver {
    login(data, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield ctx.prisma.user.findUnique({
                where: {
                    email: data.email
                }
            });
            if (!user)
                throw new Error('Email ou senha inválidos');
            const validation = yield (0, bcryptjs_1.compare)(data.password, user === null || user === void 0 ? void 0 : user.password);
            if (!validation)
                throw new Error('Email ou senha inválidos');
            const { secret, expiresIn } = auth_1.default.jwt;
            const token = (0, jsonwebtoken_1.sign)({}, secret, {
                subject: `"${user.id}"`,
                expiresIn
            });
            return {
                user,
                token
            };
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)((returns) => Auth_1.Auth),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserLoginData, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
AuthResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], AuthResolver);
exports.AuthResolver = AuthResolver;
