import { Estatus, Prisma } from '@prisma/client'
import { bdErrors } from '../../../enums/dbError.enums'
import databaseService from '../../../database/database.services'
import { errorInterno } from '../../../types/errorTypes'

const getAllEstatus = async (): Promise<Estatus[] | errorInterno> => {
  const datos: Estatus[] | errorInterno = await databaseService.estatus.findMany()
    .catch(err => { return { ErrorInterno: bdErrors.ERROR_GET_ALL, ErrorDetail: err.message } })

  return datos
}

const getEstatusID = async (id: number): Promise<Estatus | errorInterno | null> => {
  const datos: Estatus | errorInterno | null = await databaseService.estatus.findFirst({
    where: {
      codigo: id
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_GET, ErrorDetail: err.message } })
  return datos
}

const createEstatus = async (datos: Prisma.EstatusCreateInput): Promise<Prisma.EstatusCreateInput | errorInterno> => {
  const datosEstatus: Prisma.EstatusCreateInput | errorInterno = await databaseService.estatus.create({
    data: datos
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_INSERT, ErrorDetail: err.message } })

  return datosEstatus

}

const updateEstatus = async (valueEstatus: Prisma.EstatusUncheckedUpdateInput): Promise<Prisma.EstatusUncheckedUpdateInput | errorInterno> => {
  const datos: Prisma.EstatusUncheckedUpdateInput | errorInterno = await databaseService.estatus.update({
    where: {
      codigo: valueEstatus.codigo as number
    },
    data: valueEstatus
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_UPDATE, ErrorDetail: err.message } })

  return datos
}

const deleteEstatus = async (codigoEstatus: number): Promise<Estatus | errorInterno> => {
  const datos: Estatus | errorInterno = await databaseService.estatus.delete({
    where: {
      codigo: codigoEstatus
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_ELIMINAR, ErrorDetail: err.message } })

  return datos
}

export default { getAllEstatus, getEstatusID, createEstatus, updateEstatus, deleteEstatus }