import type { Context, Next } from 'hono';
import { jwt } from 'hono/jwt'

export function jwtMiddleware(c: Context, next: Next) {
    const whiteList = ['/user/login']

    if (whiteList.includes(c.req.path)) {
        return next()
    }

    return jwt({ secret: process.env.JWT_SECRET })(c, next)
}