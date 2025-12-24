import { timeout } from 'hono/timeout'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { contextStorage } from 'hono/context-storage'
import { jwtMiddleware } from './jwt.js'
import { singleMiddleware } from './single.js'
import type { Hono } from 'hono'

export function initMiddleware(app: Hono) {
    app.use(contextStorage())
    app.use(timeout(1000 * 10)) //超时时间
    app.use(logger())
    app.use(cors())

    //以下顺序不能改变
    app.use(jwtMiddleware)  //jwt验证
    app.use(singleMiddleware)   //单点登录
}