import { Prisma, Usuario } from '@prisma/client'
import { bdErrors } from '../../../enums/dbError.enums'
import databaseService from '../../../database/database.services'
import { errorInterno } from '../../../types/errorTypes'
import { decryptPassword, encryptPassword } from '../../../utils/lib.utils'
import { deleteImage } from '../../../utils/cloudi.utils'

const getAllUsuarios = async (): Promise<Usuario[] | errorInterno> => {
  const listadoUsuarios: Usuario[] | errorInterno = await databaseService.usuario.findMany()
    .catch(err => { return { ErrorInterno: bdErrors.ERROR_GET_ALL, ErrorDetail: err.message } })

  return listadoUsuarios
}

const getUsuario = async (username: string): Promise<Usuario | errorInterno | null> => {
  const user: Usuario | errorInterno | null = await databaseService.usuario.findFirst({
    where: {
      usuario: username
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_GET, ErrorDetail: err.message } })

  return user
}

const createUser = async (user: Prisma.UsuarioUncheckedCreateInput): Promise<Prisma.UsuarioUncheckedCreateInput | errorInterno> => {
  const passHash: string = encryptPassword(user.password)
  const userWithPassHash: Prisma.UsuarioUncheckedCreateInput = { ...user, password: passHash }
  const userData: Prisma.UsuarioUncheckedCreateInput | errorInterno = await databaseService.usuario.create({
    data: userWithPassHash
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_INSERT, ErrorDetail: err.message } })

  return userData
}

const updateUser = async (user: Prisma.UsuarioUncheckedUpdateInput): Promise<Prisma.UsuarioUncheckedUpdateInput | errorInterno> => {

  const userUpd: Prisma.UsuarioUncheckedUpdateInput | errorInterno = await databaseService.usuario.update({
    where: { usuario: user.usuario as string },
    data: user
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_UPDATE, ErrorDetail: err.message } })

  return userUpd
}

const deleteUser = async (username: string): Promise<Usuario | errorInterno> => {
  const empresaLogo = await getUsuario(username)
  const { userImage } = empresaLogo as Usuario
  deleteImage(userImage as string)
  const datos: Usuario | errorInterno = await databaseService.usuario.delete({
    where: {
      usuario: username
    }

  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_ELIMINAR, ErrorDetail: err.message } })

  return datos
}

export default { getAllUsuarios, getUsuario, createUser, updateUser, deleteUser }