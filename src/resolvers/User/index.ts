import { User, UserInputData } from '@app/models/User'
import { Context } from '@app/services/prismaContext/types'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { UserController } from '@app/controllers/User'

type RequestError = {
  message: string
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

  @Mutation(() => User)
  async signUp(
    @Arg('data') data: UserInputData,
    @Ctx() ctx: Context
  ): Promise<User> {
    return UserController.createUser(ctx, data)
  }
}
