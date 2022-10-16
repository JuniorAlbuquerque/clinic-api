import { Context } from '@app/services/prismaContext/types'
import { compare } from 'bcryptjs'
import { IsEmail } from 'class-validator'
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql'
import AuthConfig from '@app/config/auth'
import { sign } from 'jsonwebtoken'
import { Auth } from '@app/models/Auth'

@InputType()
class UserLoginData {
  @Field()
  @IsEmail()
  email: string

  @Field()
  password: string
}

@Resolver()
export class AuthResolver {
  @Mutation((returns) => Auth)
  async login(
    @Arg('data') data: UserLoginData,
    @Ctx() ctx: Context
  ): Promise<Auth | null> {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email: data.email
      }
    })

    if (!user) throw new Error('Email ou senha inválidos')

    const validation = await compare(data.password, user?.password)

    if (!validation) throw new Error('Email ou senha inválidos')

    const { secret, expiresIn } = AuthConfig.jwt

    const token = sign({}, secret, {
      subject: `"${user.id}"`,
      expiresIn
    })

    return {
      user,
      token
    }
  }
}
