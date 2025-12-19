import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/db/schema.ts',
    out: './drizzle',
    dbCredentials: {
        host: 'localhost',
        port: 5432,
        database: 'test',
        user: 'postgres',
        password: '123456'
    }
})