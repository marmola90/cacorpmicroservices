import { Request, Response } from 'express'
import { bdErrors } from '../../enums/dbError.enums'
import { handlerHttp } from '../../utils/error.handler'
import empresasServices from '../../services/empresas/v1/empresas.services'
import { empresaIdAdapterParams, empresaTransformAdapter, empresaTransformAdapterUpdate } from '../../adapters/empresa.adapters'
import { uploadImage } from '../../utils/cloudi.utils'
import { urlImage } from '../../types/cloudiImageUrlTypes'


export const getAllEmpresas = async (_req: Request, res: Response) => {
  try {
    const allEmpresas = await empresasServices.getAllEmpresas()
    const sendData = { data: allEmpresas }
    res.send(sendData)

  } catch (error: Error | any) {
    handlerHttp(res, bdErrors.ERROR_GET_ALL, error)
  }
}

export const getEmpresa = async (req: Request, res: Response) => {
  try {
    const codEmpresa = empresaIdAdapterParams(req)
    const empresa = await empresasServices.getEmpresaId(codEmpresa)
    res.send({ data: empresa })
  } catch (error: Error | any) {
    handlerHttp(res, bdErrors.ERROR_GET, error)
  }
}

export const createEmpresa = async (req: Request, res: Response) => {
  try {
    const urlIm: urlImage = await uploadImage(req.body.datos.urlImage, req.body.datos.descripcion) as urlImage
    const varEmpresa = await empresaTransformAdapter(req, urlIm)
    const datosEmpresa = await empresasServices.createEmpresa(varEmpresa)
    res.send({ data: datosEmpresa })
  } catch (error: Error | any) {
    handlerHttp(res, bdErrors.ERROR_INSERT, error)
  }
}

export const updateEmpresa = async (req: Request, res: Response) => {
  try {
    const urlIm: urlImage | null = req.body.datos.urlImage ? await uploadImage(req.body.datos.urlImage, req.body.datos.descripcion) as urlImage : null
    const varEmpresa = await empresaTransformAdapterUpdate(req, urlIm)
    const datosEmpresa = await empresasServices.updateEmpresa(varEmpresa)
    res.send({ data: datosEmpresa })
  } catch (error: Error | any) {
    handlerHttp(res, bdErrors.ERROR_UPDATE, error)
  }
}

export const deleteEmpresa = async (req: Request, res: Response) => {
  try {
    const codEmpresa = empresaIdAdapterParams(req)
    const datosEmpresa = await empresasServices.deleteEmpresa(codEmpresa)
    res.send({ data: datosEmpresa })
  } catch (error: Error | any) {
    handlerHttp(res, bdErrors.ERROR_ELIMINAR, error)
  }
}