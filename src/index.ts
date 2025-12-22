import './loadEnv.js'   //确保环境变量加载
import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import { initRoutes } from './routes/index.js'
import { initExceptionHandler } from './exceptionHandler/index.js'
import { initMiddleware } from './middleware/index.js'
import type { JwtVariables } from 'hono/jwt'

import { logger } from './common/logger.js'
import { appConfig } from './config/index.js'

export const app = new Hono<{
    Variables: JwtVariables
}>()

app.notFound((c) => {
    return c.text('Not Found', 404)
})

initExceptionHandler()   //初始化全局异常处理器
initMiddleware()     //初始化中间件
initRoutes()     //初始化路由

serve({
    fetch: app.fetch,
    port: appConfig.server.port
}, (info) => {
    logger.info(`服务已启动 http://localhost:${info.port}`)
})