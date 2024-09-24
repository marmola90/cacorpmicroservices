import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../utils/jwt.handler'

const checkSession = (req: Request, resp: Response, next: NextFunction) => {
  try {
    const JwtUser = (req.headers.authorization != null) ? req.headers.authorization : null
    const jwt = JwtUser?.split(' ').pop()
    const isUser = verifyToken(jwt as string)

    if (isUser !== '') {
      console.log({ isUser })
      console.log({ JwtUser })

      next()
    } else {
      resp.status(401)
      resp.send('NO_TIENES_UNA_SESSION_JWT_VALIDA')
    }
  } catch (error) {
    resp.status(400)
    resp.send('SESSION_NO_VALIDA')
  }
}

export { checkSession }