import { Hono } from 'hono'
import { result } from '../common/result.js'
import { sign } from 'hono/jwt'
import * as schema from '../db/schema.js'
import { db } from '../db/index.js'
import { and, eq } from 'drizzle-orm'
import { CustomException } from '../common/customException.js'
import { redis } from '../common/redis.js'
import { appConfig } from '../config/index.js'

const userRoute = new Hono()

userRoute.post('/login', async (c) => {
    const { account, password } = await c.req.json()

    const user = await db.query.user.findFirst({
        where: and(eq(schema.user.account, account), eq(schema.user.password, password))
    })

    if (!user) {
        throw new CustomException(400, '账号或密码错误')
    }

    const token = await sign({ id: user.id, exp: Math.floor(Date.now() / 1000) + appConfig.jwt.expired }, appConfig.jwt.secret)

    redis.set(`token:${user.id}`, token, { expiration: { type: 'EX', value: appConfig.jwt.expired } })

    return result(c, { token, user })
})

userRoute.get('/getSelfInfo', async (c) => {
    const userId = c.get('userId')

    const user = await db.query.user.findFirst({
        where: eq(schema.user.id, userId)
    })

    return result(c, { ...user, account: undefined, password: undefined })
})

export default userRoute