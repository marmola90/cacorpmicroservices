import { Prisma } from "@prisma/client";
import databaseService from "../../../database/database.services";
import { IAuth } from "../../../interfaces/auth.interfaces";
import { generateToken } from "../../../utils/jwt.handler";
import { decryptPassword } from "../../../utils/lib.utils";
import userServices from '../../usuarios/v1/usuarios.services'

export const loginUser = async (logIn: IAuth) => {
  const userPassHass = await databaseService.usuario.findFirst({
    where: {
      usuario: logIn.username
    },
    select: {
      usuario: true,
      password: true
    }
  })
  const user = await userServices.getUsuario(logIn.username)
  const decryptPass = decryptPassword(logIn.password, userPassHass?.password)
  const token = userPassHass !== null ? decryptPass ? await generateToken(logIn.username) : 'CONTRASEÑA_INVALIDA' : 'NO_AUTENTICADO'
  const data = {
    token,
    datos: user !== null ? decryptPass ? user : false : false
  }

  return data
}
