import { createClient } from 'redis'
import { appConfig } from '../config/index.js'
import { logger } from './logger.js';

export const redis = await createClient({
    url: `redis://${appConfig.redis.host}:${appConfig.redis.port}`,
    username: appConfig.redis.username,
    password: appConfig.redis.password,
    socket: {
        reconnectStrategy(retries, cause) {
            if (retries > 0) {
                console.log(`redis 正在进行第 ${retries} 次重连`);
            }
            return 3000;
        },
    }
})
    .on('error', (err) => {
        // logger.error(`Redis 连接错误: ${err}`);
        console.error(`Redis 连接错误: ${err}`);
    })
    .on('connect', () => {
        logger.info('Redis 连接成功');
    })
    .connect()