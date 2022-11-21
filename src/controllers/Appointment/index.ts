import { AppointmentModel } from '@app/models/Appointment'
import { Context } from '@app/services/prismaContext/types'
import { Appointment } from '@prisma/client'

export async function getWeekAppointmentsByUser(
  ctx: Context,
  user_id: number,
  initial_date: string,
  end_date: string
): Promise<Appointment[]> {
  const dateSearch = new Date(initial_date)
  const endDateSearch = new Date(end_date)
  endDateSearch.setDate(endDateSearch.getDate() + 1)

  const appointments = await ctx.prisma.appointment.findMany({
    where: {
      date: {
        gt: dateSearch,
        lt: endDateSearch
      },
      AND: {
        professional: {
          id: user_id
        }
      }
    },
    orderBy: {
      initial_hour: 'asc'
    },
    include: {
      patients_packages: {
        select: {
          package: {
            select: {
              name: true,
              treatment: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      },
      patient: {
        select: {
          name: true
        }
      }
    }
  })

  return appointments
}
