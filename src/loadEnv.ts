import * as dotenv from 'dotenv'
import { logger } from './common/logger.js'

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({ path: ['.env', envFile] })

logger.info('环境变量已加载')