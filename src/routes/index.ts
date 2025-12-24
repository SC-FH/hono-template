import type { Hono } from 'hono'
import userRoute from './user.js'

export function initRoutes(app: Hono) {
    app.route('/user', userRoute)
}