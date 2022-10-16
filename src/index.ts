import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { context } from './services/prismaContext'
import { schema } from './schemas'

const app = () => {
  new ApolloServer({
    schema,
    context: ({ req }) => {
      const ctx = {
        req,
        token: req?.headers?.authorization,
        prisma: context.prisma
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
