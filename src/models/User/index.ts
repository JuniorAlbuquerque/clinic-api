import { IsEmail } from 'class-validator'
import { Field, ID, InputType, ObjectType } from 'type-graphql'

enum UserRoles {
  ADMIN = 'ADMIN',
  PROFESSIONAL = 'PROFESSIONAL',
  VIEWER = 'VIEWER'
}

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

  @Field((type) => ID)
  clinic_id: number | null

  @Field((type) => Date)
  createdAt: Date

  @Field((type) => Date)
  updatedAt: Date | null

  @Field((type) => Date)
  deletedAt: Date | null
}

@InputType()
export class UserInputData {
  @Field()
  @IsEmail()
  email: string

  @Field()
  password: string

  @Field()
  name: string

  @Field()
  clinic_id?: number

  @Field()
  role: UserRoles
}
