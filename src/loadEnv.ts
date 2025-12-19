import * as dotenv from 'dotenv'

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({ path: ['.env', envFile] })