import { UserInputData } from '@app/models/User'
import { Context } from '@app/services/prismaContext/types'
import { hash } from 'bcryptjs'

export class UserController {
  static async createUser(ctx: Context, data: UserInputData) {
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
