import { Patient, PatientPackage } from '@prisma/client'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class PatientModel {
  @Field()
  name: string
}

@ObjectType()
export class TreatmentModel {
  @Field()
  name: string
}

@ObjectType()
export class PackageModel {
  @Field()
  name: string

  @Field(() => TreatmentModel)
  treatment: TreatmentModel
}

@ObjectType()
export class PatientPackageModel {
  @Field()
  name: string

  @Field(() => PackageModel)
  package: PackageModel
}

@ObjectType()
export class AppointmentModel {
  @Field((type) => ID)
  id: number

  @Field()
  date: Date

  @Field()
  initial_hour: string

  @Field()
  end_hour: string

  @Field(() => PatientPackageModel)
  patients_packages: PatientPackageModel

  @Field(() => PatientModel)
  patient: PatientModel
}
