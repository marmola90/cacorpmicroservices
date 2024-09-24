import { Request, Response } from 'express'
import { bdErrors } from '../../enums/dbError.enums'
import { handlerHttp } from '../../utils/error.handler'
import { uploadImage } from '../../utils/cloudi.utils'
import { urlImage } from '../../types/cloudiImageUrlTypes'
import usuariosServices from '../../services/usuarios/v1/usuarios.services'
import { userAdapterParams, userTransformAdapter, userUpdateAdapter } from '../../adapters/usuarios.adapters'

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const allUsuarios = await usuariosServices.getAllUsuarios()
    const sendData = { data: allUsuarios }
    res.send(sendData)

  } catch (error: Error | any) {
    handlerHttp(res, bdErrors.ERROR_GET_ALL, error)
  }
}

export const getUsuario = async (req: Request, res: Response) => {
  try {
    const username = userAdapterParams(req)
    const user = await usuariosServices.getUsuario(username)
    res.send({ data: user })
  } catch (error: Error | any) {
    handlerHttp(res, bdErrors.ERROR_GET, error)
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const urlIm: urlImage = await uploadImage(req.body.datos.urlImage, req.body.datos.username) as urlImage
    const varUser = await userTransformAdapter(req, urlIm)
    const datosUser = await usuariosServices.createUser(varUser)
    res.send({ data: datosUser })
  } catch (error: Error | any) {
    handlerHttp(res, bdErrors.ERROR_INSERT, error)
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const urlIm: urlImage | null = req.body.datos.urlImage ? await uploadImage(req.body.datos.urlImage, req.body.datos.descripcion) as urlImage : null
    const varUser = await userUpdateAdapter(req, urlIm)
    const datosUser = await usuariosServices.updateUser(varUser)
    res.send({ data: datosUser })
  } catch (error: Error | any) {
    handlerHttp(res, bdErrors.ERROR_UPDATE, error)
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const username = userAdapterParams(req)
    const datosUser = await usuariosServices.deleteUser(username)
    res.send({ data: datosUser })
  } catch (error: Error | any) {
    handlerHttp(res, bdErrors.ERROR_ELIMINAR, error)
  }
}