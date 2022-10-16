import { Context } from '@app/services/prismaContext/types'
import { verify } from 'jsonwebtoken'
import { AuthChecker } from 'type-graphql'
import AuthConfig from '@app/config/auth'

export const AuthValidator: AuthChecker<Context> = ({ context }): boolean => {
  const authHeader = context.token

  if (!authHeader) {
    return false
  }

  const [_, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, AuthConfig.jwt.secret)

    return !!decoded
  } catch (error) {
    return false
  }
}
