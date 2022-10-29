import { getWeekAppointmentsByUser } from '@app/controllers/Appointment'
import { AppointmentModel } from '@app/models/Appointment'
import { Context } from '@app/services/prismaContext/types'
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'

@Resolver()
export class AppointmentResolver {
  @Query((returns) => [AppointmentModel], { nullable: true })
  @Authorized()
  async getWeekAppointments(
    @Arg('user_id') user_id: number,
    @Arg('initial_date') initial_date: string,
    @Arg('end_date') end_date: string,
    @Ctx() ctx: Context
  ): Promise<AppointmentModel[] | null> {
    const appointments = await getWeekAppointmentsByUser(
      ctx,
      user_id,
      initial_date,
      end_date
    )

    return appointments as unknown as AppointmentModel[]
  }
}
