'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
require('reflect-metadata')
const apollo_server_1 = require('apollo-server')
const prismaContext_1 = require('./services/prismaContext')
const schemas_1 = require('./schemas')
const app = () => {
  new apollo_server_1.ApolloServer({
    schema: schemas_1.schema,
    context: ({ req }) => {
      var _a
      const ctx = {
        req,
        token:
          (_a = req === null || req === void 0 ? void 0 : req.headers) ===
            null || _a === void 0
            ? void 0
            : _a.authorization,
        prisma: prismaContext_1.context.prisma
      }
      return ctx
    }
  }).listen(
    {
      port: 3333
    },
    () => console.log('Server running ir port 3333')
  )
}
app()
