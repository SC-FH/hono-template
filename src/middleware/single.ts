import type { Context, Next } from 'hono';
import { redis } from '../common/redis.js';
import { CustomException } from '../common/customException.js';

export async function singleMiddleware(c: Context, next: Next) {
    const payload = c.get('jwtPayload')

    //如果不存在则为白名单接口
    if (payload) {
        const key = `token:${payload.id}`

        const token = c.req.header('authorization')?.split(" ")[1]

        const resToken = await redis.get(key)

        if (resToken && resToken !== token) {
            throw new CustomException(403, '用户已在别处登录')
        }
    }

    return next()
}