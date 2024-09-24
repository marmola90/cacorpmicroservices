import { Correos, Prisma } from '@prisma/client'
import { bdErrors } from '../../../enums/dbError.enums'
import databaseService from '../../../database/database.services'
import { errorInterno } from '../../../types/errorTypes'

const getAllData = async (numeroDocumento: string): Promise<Correos[] | errorInterno> => {
  const datos: Correos[] | errorInterno = await databaseService.correos.findMany({
    where: {
      numeroDocumento: numeroDocumento,
      codigoEstatus: 1
    }
  })
    .catch(err => { return { ErrorInterno: bdErrors.ERROR_GET_ALL, ErrorDetail: err.message } })

  return datos
}
const createData = async (datos: Prisma.CorreosCreateManyInput): Promise<Prisma.CorreosCreateManyInput | errorInterno> => {
  const data: Prisma.CorreosCreateManyInput | errorInterno = await databaseService.correos.create({
    data: datos
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_INSERT, ErrorDetail: err.message } })

  return data

}

const updateData = async (valueData: Prisma.CorreosUncheckedUpdateInput): Promise<Prisma.CorreosUncheckedUpdateInput | errorInterno> => {
  const datos: Prisma.CorreosUncheckedUpdateInput | errorInterno = await databaseService.correos.update({
    where: {
      codigoEmail: valueData.codigoEmail as number,
      numeroDocumento: valueData.numeroDocumento as string
    },
    data: valueData
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_UPDATE, ErrorDetail: err.message } })

  return datos
}

const deleteData = async (codigo: number): Promise<Correos | errorInterno> => {
  const datos: Correos | errorInterno = await databaseService.correos.delete({
    where: {
      codigoEmail: codigo
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_ELIMINAR, ErrorDetail: err.message } })

  return datos
}

export default { getAllData, createData, updateData, deleteData }