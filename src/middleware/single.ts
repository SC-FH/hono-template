import { redis } from '../common/redis.js';
import { CustomException } from '../common/customException.js';
import { createMiddleware } from 'hono/factory';

export const singleMiddleware = createMiddleware(async (c, next) => {
    const userId = c.get('userId')
    //如果不存在则为白名单接口
    if (userId) {
        const key = `token:${userId}`

        const isWS = c.get('isWS')  //判断是否为websocket请求

        let token = ""

        if (isWS) {
            token = c.req.query('token') || ""
        } else {
            token = c.req.header('authorization')?.split(" ")[1] || ""
        }

        const resToken = await redis.get(key)

        if (resToken && resToken !== token) {
            throw new CustomException(401, '用户已在别处登录')
        }
    }

    return next()
})