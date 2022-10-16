"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const auth_1 = require("../middlewares/auth");
const Auth_1 = require("../resolvers/Auth");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../resolvers/User");
exports.schema = (0, type_graphql_1.buildSchemaSync)({
    resolvers: [User_1.UserResolver, Auth_1.AuthResolver],
    authChecker: auth_1.AuthValidator
});
