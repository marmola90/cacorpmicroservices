import { Prisma, Puestos } from '@prisma/client'
import { bdErrors } from '../../../enums/dbError.enums'
import databaseService from '../../../database/database.services'
import { errorInterno } from '../../../types/errorTypes'

const getAllData = async (): Promise<Puestos[] | errorInterno> => {
  const datos: Puestos[] | errorInterno = await databaseService.puestos.findMany()
    .catch(err => { return { ErrorInterno: bdErrors.ERROR_GET_ALL, ErrorDetail: err.message } })

  return datos
}

const getDataID = async (id: number): Promise<Puestos | errorInterno | null> => {
  const datos: Puestos | errorInterno | null = await databaseService.puestos.findFirst({
    where: {
      codigoPuesto: id
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_GET, ErrorDetail: err.message } })
  return datos
}

const createData = async (datos: Prisma.PuestosCreateInput): Promise<Prisma.PuestosCreateInput | errorInterno> => {
  const data: Prisma.PuestosCreateInput | errorInterno = await databaseService.puestos.create({
    data: datos
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_INSERT, ErrorDetail: err.message } })

  return data

}

const updateData = async (valueData: Prisma.PuestosUncheckedUpdateInput): Promise<Prisma.PuestosUncheckedUpdateInput | errorInterno> => {
  const datos: Prisma.PuestosUncheckedUpdateInput | errorInterno = await databaseService.puestos.update({
    where: {
      codigoPuesto: valueData.codigoPuesto as number
    },
    data: valueData
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_UPDATE, ErrorDetail: err.message } })

  return datos
}

const deleteData = async (codigo: number): Promise<Puestos | errorInterno> => {
  const datos: Puestos | errorInterno = await databaseService.puestos.delete({
    where: {
      codigoPuesto: codigo
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_ELIMINAR, ErrorDetail: err.message } })

  return datos
}

export default { getAllData, getDataID, createData, updateData, deleteData }