import { app } from '../index.js'
import { timeout } from 'hono/timeout'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { contextStorage } from 'hono/context-storage'
import { jwtMiddleware } from './jwt.js'

export function initMiddleware() {
    app.use(contextStorage())
    app.use(timeout(1000 * 10)) //超时时间
    app.use(logger())
    app.use(cors())
    app.use(jwtMiddleware)
}