import { jwt, verify } from 'hono/jwt'
import { appConfig } from '../config/index.js';
import { createMiddleware } from 'hono/factory';
import { CustomException } from '../common/customException.js';

export const jwtMiddleware = createMiddleware(async (c, next) => {

    const whiteList = ['/user/login']

    const upgradeHeader = c.req.header('Upgrade')
    const isWS = upgradeHeader?.toLowerCase() === 'websocket'

    c.set('isWS', isWS)

    if (isWS) {
        const token = c.req.query('token') || ''

        try {
            const jwtPayload: any = await verify(token, appConfig.jwt.secret)
            c.set('jwtPayload', jwtPayload)
            const { id } = jwtPayload
            c.set('userId', id)
        } catch (err) {
            throw new CustomException(401, 'Unauthorized')
        }

        return next()
    }

    if (whiteList.includes(c.req.path)) {
        return next()
    }
    return jwt({ secret: appConfig.jwt.secret })(c, () => {
        const { id } = c.get('jwtPayload')
        c.set('userId', id)
        return next()
    })
})