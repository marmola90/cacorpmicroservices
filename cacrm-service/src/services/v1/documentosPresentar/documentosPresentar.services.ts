import { Documentos_Presentar, Prisma } from '@prisma/client'
import { bdErrors } from '../../../enums/dbError.enums'
import databaseService from '../../../database/database.services'
import { errorInterno } from '../../../types/errorTypes'

const getAllDocPresentar = async (): Promise<Documentos_Presentar[] | errorInterno> => {
  const datos: Documentos_Presentar[] | errorInterno = await databaseService.documentos_Presentar.findMany()
    .catch(err => { return { ErrorInterno: bdErrors.ERROR_GET_ALL, ErrorDetail: err.message } })

  return datos
}

const getDocPresentarID = async (id: number): Promise<Documentos_Presentar | errorInterno | null> => {
  const datos: Documentos_Presentar | errorInterno | null = await databaseService.documentos_Presentar.findFirst({
    where: {
      codigoDoc: id
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_GET, ErrorDetail: err.message } })
  return datos
}

const createDocPresentar = async (datos: Prisma.Documentos_PresentarCreateWithoutDocumentosPInput): Promise<Prisma.Documentos_PresentarCreateWithoutDocumentosPInput | errorInterno> => {
  const empresa: Prisma.Documentos_PresentarCreateWithoutDocumentosPInput | errorInterno = await databaseService.documentos_Presentar.create({
    data: datos
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_INSERT, ErrorDetail: err.message } })

  return empresa

}

const updateDocPresentar = async (valueDoc: Prisma.Documentos_PresentarUncheckedUpdateWithoutDocumentosPInput): Promise<Prisma.Documentos_PresentarUncheckedUpdateWithoutDocumentosPInput | errorInterno> => {
  const datos: Prisma.Documentos_PresentarUncheckedUpdateWithoutDocumentosPInput | errorInterno = await databaseService.documentos_Presentar.update({
    where: {
      codigoDoc: valueDoc.codigoDoc as number
    },
    data: valueDoc
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_UPDATE, ErrorDetail: err.message } })

  return datos
}

const deleteDocPresentar = async (codigoDoc: number): Promise<Documentos_Presentar | errorInterno> => {
  const datos: Documentos_Presentar | errorInterno = await databaseService.documentos_Presentar.delete({
    where: {
      codigoDoc: codigoDoc
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_ELIMINAR, ErrorDetail: err.message } })

  return datos
}

export default { getAllDocPresentar, getDocPresentarID, createDocPresentar, updateDocPresentar, deleteDocPresentar }