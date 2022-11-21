import { PatientInputData } from '@app/models/Patient'
import { Context } from '@app/services/prismaContext/types'

export class PatientController {
  static async createPatient(ctx: Context, data: PatientInputData) {
    const findedPatient = await ctx.prisma.patient.findUnique({
      where: {
        email: data.email
      }
    })

    if (findedPatient) {
      throw new Error('Patient already created.')
    }

    return await ctx.prisma.patient.create({
      data
    })
  }

  static async getPatientCount(ctx: Context) {
    const count = await ctx.prisma.patient.count()

    const lastPatients = await ctx.prisma.patient.findMany({
      take: 3,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        name: true,
        birthdate: true,
        patients_packages: {
          select: {
            package: {
              select: {
                name: true
              }
            }
          }
        },
        telephone: true,
        appointments: {
          take: 1,
          orderBy: {
            date: 'desc'
          },
          select: {
            date: true
          }
        }
      }
    })

    return {
      count,
      lastPatients
    }
  }
}
