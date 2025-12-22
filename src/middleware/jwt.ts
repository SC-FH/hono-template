import type { Context, Next } from 'hono';
import { jwt } from 'hono/jwt'
import { appConfig } from '../config/index.js';

export function jwtMiddleware(c: Context, next: Next) {
    const whiteList = ['/user/login']

    if (whiteList.includes(c.req.path)) {
        return next()
    }

    return jwt({ secret: appConfig.jwt.secret })(c, next)
}