import { createClient } from 'redis'
import { appConfig } from '../config/index.js'

export const redis = await createClient({
    url: `redis://${appConfig.redis.host}:${appConfig.redis.port}`,
    username: appConfig.redis.username,
    password: appConfig.redis.password
}).connect()