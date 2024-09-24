import { Domicilio, Prisma } from '@prisma/client'
import { bdErrors } from '../../../enums/dbError.enums'
import databaseService from '../../../database/database.services'
import { errorInterno } from '../../../types/errorTypes'

const getAllData = async (numeroDocumento: string): Promise<Domicilio[] | errorInterno> => {
  const datos: Domicilio[] | errorInterno = await databaseService.domicilio.findMany({
    where: {
      numeroDocumento: numeroDocumento,
      codigoEstatus: 1
    }
  })
    .catch(err => { return { ErrorInterno: bdErrors.ERROR_GET_ALL, ErrorDetail: err.message } })

  return datos
}
const createData = async (datos: Prisma.DomicilioCreateManyInput): Promise<Prisma.DomicilioCreateManyInput | errorInterno> => {
  const data: Prisma.DomicilioCreateManyInput | errorInterno = await databaseService.domicilio.create({
    data: datos
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_INSERT, ErrorDetail: err.message } })

  return data

}

const updateData = async (valueData: Prisma.DomicilioUncheckedUpdateInput): Promise<Prisma.DomicilioUncheckedUpdateInput | errorInterno> => {
  const datos: Prisma.DomicilioUncheckedUpdateInput | errorInterno = await databaseService.domicilio.update({
    where: {
      codigoDomicilio: valueData.codigoDomicilio as number,
      numeroDocumento: valueData.numeroDocumento as string
    },
    data: valueData
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_UPDATE, ErrorDetail: err.message } })

  return datos
}

const deleteData = async (codigo: number): Promise<Domicilio | errorInterno> => {
  const datos: Domicilio | errorInterno = await databaseService.domicilio.delete({
    where: {
      codigoDomicilio: codigo
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_ELIMINAR, ErrorDetail: err.message } })

  return datos
}

export default { getAllData, createData, updateData, deleteData }