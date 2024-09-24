import { Request, Response } from 'express'
import { bdErrors } from '../../enums/dbError.enums'
import { handlerHttp } from '../../utils/error.handler'
import permisosServices from '../../services/permisos/v1/permisos.services'
import { permisoIdAdapter, permisoIdAdapterParam, permisosAdapter, permisosAdpaterUpdate, permisosAsignarAdapter, permisosAsignarAdapterParams } from '../../adapters/permiso.adapters'

export const getAllPermisos = async (_req: Request, res: Response) => {
  try {
    const allPermisos = await permisosServices.getAllPermisos()
    const sendData = { data: allPermisos }
    res.send(sendData)

  } catch (error: Error | any) {
    handlerHttp(res, bdErrors.ERROR_GET_ALL, error)
  }
}


export const getPermisos = async (req: Request, res: Response) => {
  try {
    const codPermiso = permisoIdAdapter(req)
    const permiso = await permisosServices.getPermiso(codPermiso)
    res.send({ data: permiso })
  } catch (error: Error | any) {
    handlerHttp(res, bdErrors.ERROR_GET, error)
  }
}

export const createPermisos = async (req: Request, res: Response) => {
  try {
    const varPermisos = permisosAdapter(req)
    const datosPermisos = await permisosServices.createPermisos(varPermisos)
    res.send({ data: datosPermisos })
  } catch (error: Error | any) {
    handlerHttp(res, bdErrors.ERROR_INSERT, error)
  }
}

export const updatePermisos = async (req: Request, res: Response) => {
  try {
    const varPermisos = permisosAdpaterUpdate(req)
    const datosPermisos = await permisosServices.updatePermisos(varPermisos)
    res.send({ data: datosPermisos })
  } catch (error: Error | any) {
    handlerHttp(res, bdErrors.ERROR_UPDATE, error)
  }
}

export const deletePermisos = async (req: Request, res: Response) => {
  try {
    const codPermiso = permisoIdAdapterParam(req)
    const datosPermisos = await permisosServices.deletePermisos(codPermiso)
    res.send({ data: datosPermisos })
  } catch (error: Error | any) {
    handlerHttp(res, bdErrors.ERROR_ELIMINAR, error)
  }
}

export const getAllPermisosOtorgados = async (_req: Request, res: Response) => {
  try {
    const allPermisos = await permisosServices.getAllPermisosOtorgados()
    const sendData = { data: allPermisos }
    res.send(sendData)

  } catch (error: Error | any) {
    handlerHttp(res, bdErrors.ERROR_GET_ALL, error)
  }
}

export const asignarPermisos = async (req: Request, res: Response) => {
  try {
    const varPermisos = permisosAsignarAdapter(req)
    const datosPermisosOtorgados = await permisosServices.asignarPermisos(varPermisos)
    res.send({ data: datosPermisosOtorgados })
  } catch (error: Error | any) {
    handlerHttp(res, bdErrors.ERROR_INSERT, error)
  }
}

export const deletePermisosOtorgados = async (req: Request, res: Response) => {
  try {
    const varPermisos = permisosAsignarAdapterParams(req)
    const datosPermisos = await permisosServices.deletePermisosOtorgados(varPermisos)
    res.send({ data: datosPermisos })
  } catch (error: Error | any) {
    handlerHttp(res, bdErrors.ERROR_ELIMINAR, error)
  }
}