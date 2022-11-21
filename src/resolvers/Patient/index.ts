import { PatientController } from '@app/controllers/Patient'
import {
  Patient,
  PatientInputData,
  PatientListCount
} from '@app/models/Patient'
import { Context } from '@app/services/prismaContext/types'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'

@Resolver()
export class PatientResovler {
  @Authorized()
  @Mutation(() => Patient)
  async createPatient(
    @Arg('data') data: PatientInputData,
    @Ctx() ctx: Context
  ): Promise<Patient> {
    const patient = await PatientController.createPatient(ctx, data)
    return patient
  }

  @Authorized()
  @Query((returns) => PatientListCount, { nullable: true })
  async getPatientCountList(@Ctx() ctx: Context): Promise<PatientListCount> {
    const patientCount = await PatientController.getPatientCount(ctx)

    return patientCount
  }
}
