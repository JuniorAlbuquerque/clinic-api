import { User } from '@app/models/User'
import { Context } from '@app/services/prismaContext/types'
import { IsEmail } from 'class-validator'
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver
} from 'type-graphql'
import { hash } from 'bcryptjs'

type RequestError = {
  message: string
}

@InputType()
class UserInputData {
  @Field()
  @IsEmail()
  email: string

  @Field()
  password: string

  @Field()
  name: string
}

@Resolver()
export class UserResolver {
  @Query((returns) => User, { nullable: true })
  @Authorized()
  async getUserInfo(
    @Arg('id') id: number,
    @Ctx() ctx: Context
  ): Promise<User | null | RequestError> {
    const dbUser = await ctx.prisma.user.findUnique({ where: { id } })

    if (!dbUser) throw new Error('User not found.')

    return dbUser
  }

  @Mutation((returns) => User)
  async signUp(
    @Arg('data') data: UserInputData,
    @Ctx() ctx: Context
  ): Promise<User> {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email: data.email
      }
    })

    if (user) {
      throw new Error('User already created.')
    }

    const hashedPassword = await hash(data.password, 10)

    return ctx.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword
      }
    })
  }
}
