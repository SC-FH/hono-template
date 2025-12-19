import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { result } from '../common/result.js'
import { sign } from 'hono/jwt'

const userRoute = new Hono()

userRoute.get('/login', async (c) => {
    const token = await sign({ id: 1, exp: Math.floor(Date.now() / 1000) + 10 }, "123")
    return result(c, { token })

})

userRoute.get('/test', async (c) => {
    const data = c.get('jwtPayload')
    console.log(data);

    return result(c, data)
})

export default userRoute