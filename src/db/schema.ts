import { pgTable, integer, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const user = pgTable("user", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "user_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 255 }),
	phone: varchar({ length: 255 }),
	account: varchar({ length: 255 }),
	password: varchar({ length: 255 }),
});
