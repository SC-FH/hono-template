import './loadEnv.js'   //确保环境变量加载
import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'

import { logger } from './common/logger.js'
import { appConfig } from './config/index.js'


async function bootstrap() {
    const app = new Hono()

    app.use('/static/*', serveStatic({ root: './public' })) //静态资源托管

    app.notFound((c) => {
        return c.text('Not Found', 404)
    })

    //使用异步加载模块，确保模块加载顺序
    const { initWS } = await import('./ws/index.js')
    const { injectWebSocket } = initWS(app)

    const { initExceptionHandler } = await import('./exceptionHandler/index.js')
    initExceptionHandler(app)   //初始化全局异常处理器

    const { initMiddleware } = await import('./middleware/index.js')
    initMiddleware(app)     //初始化中间件

    const { initRoutes } = await import('./routes/index.js')
    initRoutes(app)     //初始化路由

    const server = serve({
        fetch: app.fetch,
        port: appConfig.server.port
    }, (info) => {
        logger.info(`服务已启动 http://localhost:${info.port}`)
    })

    injectWebSocket(server)
}

bootstrap()
