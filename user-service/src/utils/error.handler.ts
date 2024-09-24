import { Response } from 'express'
import { typeErrorDB } from '../types/errorTypes'

export const handlerHttp = (res: Response, Error: typeErrorDB, errorRaw?: Error) => {
  console.log(errorRaw)
  res.status(500)
  res.send({ Error, description: errorRaw?.message })
}