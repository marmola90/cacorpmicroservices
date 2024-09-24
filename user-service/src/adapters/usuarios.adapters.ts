import { Genero, estadoUsuario, Usuario, Role, Prisma } from "@prisma/client"
import { Request } from "express"
import { urlImage } from "../types/cloudiImageUrlTypes"

export const userAdapterParams = (req: Request): string => {
  const { username } = req.params
  const usuario = username
  return usuario
}

export const userTransformAdapter = async (req: Request, urlIm: urlImage): Promise<Prisma.UsuarioUncheckedCreateInput> => {
  const { datos } = req.body
  const user: Prisma.UsuarioUncheckedCreateInput = {
    usuario: datos.username,
    password: datos.password,
    role: datos.role,
    primerApellido: datos.primerApellido,
    primerNombre: datos.primerNombre,
    segundoApellido: datos.segundoApellido,
    segundoNombre: datos.segundoNombre,
    sexo: datos.sexo,
    estado: datos.estado,
    email: datos.email,
    fechaNacimiento: datos.fechaNacimiento,
    codigoEmpresa: datos.codigoEmpresa,
    userImageUrl: urlIm.url,
    userImage: urlIm.public_id
  }

  return user
}

export const userUpdateAdapter = async (req: Request, urlIm: urlImage | null): Promise<Prisma.UsuarioUncheckedUpdateInput> => {
  const { datos } = req.body
  const user: Prisma.UsuarioUncheckedUpdateInput = {
    usuario: datos?.username,
    role: datos?.role,
    primerApellido: datos?.primerApellido,
    primerNombre: datos?.primerNombre,
    segundoApellido: datos?.segundoApellido,
    segundoNombre: datos?.segundoNombre,
    sexo: datos?.sexo,
    estado: datos?.estado,
    email: datos?.email,
    fechaNacimiento: datos?.fechaNacimiento,
    codigoEmpresa: datos?.codigoEmpresa,
    userImageUrl: urlIm?.url,
    userImage: urlIm?.public_id
  }

  return user
}