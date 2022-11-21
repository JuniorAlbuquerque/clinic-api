import { IsEmail } from 'class-validator'
import { Field, ID, InputType, ObjectType } from 'type-graphql'

@ObjectType()
export class Patient {
  @Field((type) => ID)
  id: number

  @Field()
  @IsEmail()
  email: string

  @Field((type) => String)
  name: string

  @Field((type) => String)
  telephone: string

  @Field((type) => String)
  birthdate: string

  @Field((type) => ID)
  clinic_id: number | null
}

@ObjectType()
class AppointmentList {
  @Field((type) => Date)
  date: Date
}

@ObjectType()
class PackageItem {
  @Field((type) => String)
  name: string
}

@ObjectType()
class PackageList {
  @Field((type) => PackageItem)
  package: PackageItem
}

@ObjectType()
class LastPatientList {
  @Field((type) => Number)
  id: number

  @Field((type) => String)
  name: string

  @Field((type) => String)
  birthdate: string

  @Field((type) => [AppointmentList])
  appointments: AppointmentList[]

  @Field((type) => String)
  telephone: string

  @Field((type) => [PackageList])
  patients_packages: PackageList[]
}

@ObjectType()
export class PatientListCount {
  @Field((type) => Number)
  count: number

  @Field((type) => [LastPatientList])
  lastPatients: LastPatientList[]
}

@InputType()
export class PatientInputData {
  @Field()
  @IsEmail()
  email: string

  @Field()
  name: string

  @Field()
  telephone: string

  @Field()
  birthdate: string

  @Field()
  clinic_id: number
}
