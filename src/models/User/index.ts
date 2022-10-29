import { IsEmail } from 'class-validator'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field((type) => ID)
  id: number

  @Field()
  @IsEmail()
  email: string

  @Field((type) => String)
  name: string

  @Field((type) => String)
  role: string

  @Field((type) => String)
  password: string

  @Field((type) => Date)
  createdAt: Date

  @Field((type) => Date)
  updatedAt: Date | null

  @Field((type) => Date)
  deletedAt: Date | null
}
