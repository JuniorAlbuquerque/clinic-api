import { Appointment, PrismaClient } from '@prisma/client'
import { format } from 'date-fns'

async function main() {
  const prisma = new PrismaClient()

  prisma.$use(async (params, next) => {
    if (params.model === 'Appointment' && params.action === 'findMany') {
      const result = await next(params)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result.forEach((element: any) => {
        if (element.date) {
          element.date = element.date.toISOString().substring(0, 10)
        }
      })
      return result
    }
    return next(params)
  })

  await prisma.clinic.create({
    data: {
      name: 'Clínica de Fisioterapia e Pilates - Sabrina Albuquerque',
      address: 'Rua Alexandre Ribeiro, 2780, Emílio Moreira',
      color: '#3C1E49'
    }
  })

  // const patiendId = 2
  // const professionalId = 2
  // const packageId = 2

  // const patient_package = await prisma.patientPackage.create({
  //   data: {
  //     initialDate: new Date('10-26-2022'),
  //     endData: new Date('11-08-2022'),
  //     user: {
  //       connect: {
  //         id: professionalId
  //       }
  //     },
  //     patient: {
  //       connect: {
  //         id: patiendId
  //       }
  //     },
  //     package: {
  //       connect: {
  //         id: packageId
  //       }
  //     }
  //   },
  //   include: {
  //     package: {
  //       include: { treatment: true }
  //     }
  //   }
  // })

  // for (let i = 0; i < 10; i++) {
  //   const date = patient_package?.initialDate
  //   date.setDate(date.getDate() + 1)

  //   await prisma.appointment.create({
  //     data: {
  //       patient: {
  //         connect: {
  //           id: patiendId
  //         }
  //       },
  //       professional: {
  //         connect: {
  //           id: professionalId
  //         }
  //       },
  //       date,
  //       initial_hour: '09:00',
  //       end_hour: '10:00',
  //       value: patient_package?.package?.treatment?.value,

  //       patients_packages: {
  //         connect: {
  //           id: patient_package?.id
  //         }
  //       }
  //     }
  //   })
  // }

  console.log('OK!')
}

main()
