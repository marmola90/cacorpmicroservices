import { Prisma, TipoContrato } from '@prisma/client'
import { bdErrors } from '../../../enums/dbError.enums'
import databaseService from '../../../database/database.services'
import { errorInterno } from '../../../types/errorTypes'

const getAllData = async (): Promise<TipoContrato[] | errorInterno> => {
  const datos: TipoContrato[] | errorInterno = await databaseService.tipoContrato.findMany()
    .catch(err => { return { ErrorInterno: bdErrors.ERROR_GET_ALL, ErrorDetail: err.message } })

  return datos
}

const getDataID = async (id: number): Promise<TipoContrato | errorInterno | null> => {
  const datos: TipoContrato | errorInterno | null = await databaseService.tipoContrato.findFirst({
    where: {
      codigoTC: id
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_GET, ErrorDetail: err.message } })
  return datos
}

const createData = async (datos: Prisma.TipoContratoCreateWithoutContratoInput): Promise<Prisma.TipoContratoCreateWithoutContratoInput | errorInterno> => {
  const data: Prisma.TipoContratoCreateWithoutContratoInput | errorInterno = await databaseService.tipoContrato.create({
    data: datos
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_INSERT, ErrorDetail: err.message } })

  return data

}

const updateData = async (valueData: Prisma.TipoContratoUncheckedUpdateWithoutContratoInput): Promise<Prisma.TipoContratoUncheckedUpdateWithoutContratoInput | errorInterno> => {
  const datos: Prisma.TipoContratoUncheckedUpdateWithoutContratoInput | errorInterno = await databaseService.tipoContrato.update({
    where: {
      codigoTC: valueData.codigoTC as number
    },
    data: valueData
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_UPDATE, ErrorDetail: err.message } })

  return datos
}

const deleteData = async (codigo: number): Promise<TipoContrato | errorInterno> => {
  const datos: TipoContrato | errorInterno = await databaseService.tipoContrato.delete({
    where: {
      codigoTC: codigo
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_ELIMINAR, ErrorDetail: err.message } })

  return datos
}

export default { getAllData, getDataID, createData, updateData, deleteData }