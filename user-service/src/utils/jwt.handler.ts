import { JwtPayload, sign, verify } from 'jsonwebtoken'

const JWT_SECRET: string = process.env.JWT_SECRET as string

const generateToken = async (user: string): Promise<string | object> => {
  const jwt: string | object = sign({ user }, JWT_SECRET, {
    expiresIn: '8h'
  })
  return jwt
}

const verifyToken = (jwt: string): string | JwtPayload => {
  const isOk = verify(jwt, JWT_SECRET)
  return isOk
}

const obtenerUsuarioAuth = (JwtUser: string): string => {
  const jwt = JwtUser?.split(' ').pop()
  const isUser: any = verifyToken(jwt as string)
  return isUser.user
}

export { generateToken, verifyToken, obtenerUsuarioAuth }
