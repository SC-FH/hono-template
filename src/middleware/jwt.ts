import { jwt } from 'hono/jwt'
import { appConfig } from '../config/index.js';
import { createMiddleware } from 'hono/factory';

export const jwtMiddleware = createMiddleware(async (c, next) => {

    const whiteList = ['/user/login']

    if (whiteList.includes(c.req.path)) {
        return next()
    }
    return jwt({ secret: appConfig.jwt.secret })(c, () => {
        const { id } = c.get('jwtPayload')
        c.set('userId', id)
        return next()
    })
})