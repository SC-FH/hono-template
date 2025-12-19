import { drizzle } from 'drizzle-orm/postgres-js'

import { userTable } from './schema/user.js'

export async function initDB() {
    const db = drizzle("postgresql://postgres:123456@localhost:5432/test")

    const res = await db.select().from(userTable)
    console.log(res);
}
