import { app } from '../index.js'
import { timeout } from 'hono/timeout'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { contextStorage } from 'hono/context-storage'
import { jwtMiddleware } from './jwt.js'
import { singleMiddleware } from './single.js'

export function initMiddleware() {
    app.use(contextStorage())
    app.use(timeout(1000 * 10)) //超时时间
    app.use(logger())
    app.use(cors())

    //以下顺序不能改变
    app.use(jwtMiddleware)  //jwt验证
    app.use(singleMiddleware)   //单点登录
}