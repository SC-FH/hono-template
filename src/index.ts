import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import { initRoutes } from './routes/index.js'
import { initExceptionHandler } from './exceptionHandler/index.js'
import { initMiddleware } from './middleware/index.js'
import type { JwtVariables } from 'hono/jwt'
import { initDB } from './db/index.js'

export const app = new Hono<{ Variables: JwtVariables }>()

initDB()     //初始化数据库
initExceptionHandler()   //初始化全局异常处理器
initMiddleware()     //初始化中间件
initRoutes()     //初始化路由

app.notFound((c) => {
    return c.text('Not Found', 404)
})

serve({
    fetch: app.fetch,
    port: 3000
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
})
