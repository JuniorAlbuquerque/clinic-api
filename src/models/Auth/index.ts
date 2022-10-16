import { Field, ObjectType } from 'type-graphql'
import { User } from '../User'

interface IAuth {
  token: string
  user: User
}

@ObjectType()
export class Auth implements IAuth {
  @Field((type) => User)
  user: User

  @Field({ nullable: false })
  token: string
}
