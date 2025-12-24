import { HTTPException } from 'hono/http-exception'
import { logger } from '../common/logger.js'
import type { Hono } from 'hono'

/**
 * 全局异常处理器
 */
export function initExceptionHandler(app: Hono) {
    app.onError((err, ctx) => {
        if (err instanceof HTTPException) {
            return ctx.json({ code: err.status, message: err.message }, err.status)
        }

        logger.error(err)
        return ctx.json({ message: err.message }, 500)
    })
}