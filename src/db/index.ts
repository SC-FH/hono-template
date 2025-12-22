import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from './schema.js'
import { appConfig } from '../config/index.js'

export const db = drizzle(`postgresql://${appConfig.db.username}:${appConfig.db.password}@${appConfig.db.host}:${appConfig.db.port}/${appConfig.db.database}`, { schema })