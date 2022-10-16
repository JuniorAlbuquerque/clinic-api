import { PrismaClient } from '@prisma/client'
import { Context } from './types'

const prisma = new PrismaClient()

export const context: Context = {
  prisma
}
