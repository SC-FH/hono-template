import { Hono } from 'hono'
import { result } from '../common/result.js'
import { sign } from 'hono/jwt'
import * as schema from '../db/schema.js'
import { db } from '../db/index.js'
import { and, eq } from 'drizzle-orm'
import { CustomException } from '../common/customException.js'
import { redis } from '../common/redis.js'
import { appConfig } from '../config/index.js'
import { ws } from '../ws/index.js'
import { z } from 'zod'
import { validator } from '../common/validator.js'
import { roleMiddleware } from '../middleware/role.js'

const userRoute = new Hono()

userRoute.post(
    '/login',
    validator('json', z.object({
        account: z.string(),
        password: z.string()
    })),
    async (c) => {
        const { account, password } = c.req.valid('json')

        const user = await db.query.user.findFirst({
            where: and(eq(schema.user.account, account), eq(schema.user.password, password))
        })

        if (!user) {
            throw new CustomException(400, '账号或密码错误')
        }

        const token = await sign({ id: user.id, exp: Math.floor(Date.now() / 1000) + appConfig.jwt.expired }, appConfig.jwt.secret)

        redis.set(`token:${user.id}`, token, { expiration: { type: 'EX', value: appConfig.jwt.expired } })

        return result(c, { token, user })
    }
)

userRoute.get(
    '/getSelfInfo',
    roleMiddleware(['admin']),
    async (c) => {
        const userId = c.get('userId')

        const user = await db.query.user.findFirst({
            where: eq(schema.user.id, userId)
        })

        return result(c, { ...user, account: undefined, password: undefined })
    }
)

userRoute.get('/ws', ws({
    onMessage(evt, ws) {
        if (typeof evt.data === 'string') {
            ws.send(evt.data)
        }
    },
}))

export default userRoute