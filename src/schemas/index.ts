import { AuthValidator } from '@app/middlewares/auth'
import { AppointmentResolver } from '@app/resolvers/Appointment'
import { AuthResolver } from '@app/resolvers/Auth'
import { PatientResovler } from '@app/resolvers/Patient'
import { buildSchemaSync } from 'type-graphql'
import { UserResolver } from '../resolvers/User'

export const schema = buildSchemaSync({
  resolvers: [UserResolver, AuthResolver, AppointmentResolver, PatientResovler],
  authChecker: AuthValidator
})
