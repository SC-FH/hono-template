import { app } from '../index.js'

import userRoute from './user.js'
export function initRoutes() {
    app.route('/user', userRoute)
}