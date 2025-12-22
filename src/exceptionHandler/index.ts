import { HTTPException } from 'hono/http-exception'
import { app } from '../index.js'
import { logger } from '../common/logger.js'

/**
 * 全局异常处理器
 */
export function initExceptionHandler() {
    app.onError((err, ctx) => {
        if (err instanceof HTTPException) {
            return ctx.json({ code: err.status, message: err.message }, err.status)
        }

        logger.error(err)
        return ctx.json({ message: err.message }, 500)
    })
}