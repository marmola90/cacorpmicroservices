import { Prisma, Telefonos } from '@prisma/client'
import { bdErrors } from '../../../enums/dbError.enums'
import databaseService from '../../../database/database.services'
import { errorInterno } from '../../../types/errorTypes'

const getAllData = async (numeroDocumento: string): Promise<Telefonos[] | errorInterno> => {
  const datos: Telefonos[] | errorInterno = await databaseService.telefonos.findMany({
    where: {
      numeroDocumento: numeroDocumento,
      codigoEstatus: 1
    }
  })
    .catch(err => { return { ErrorInterno: bdErrors.ERROR_GET_ALL, ErrorDetail: err.message } })

  return datos
}
const createData = async (datos: Prisma.TelefonosCreateManyInput): Promise<Prisma.TelefonosCreateManyInput | errorInterno> => {
  const data: Prisma.TelefonosCreateManyInput | errorInterno = await databaseService.telefonos.create({
    data: datos
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_INSERT, ErrorDetail: err.message } })

  return data

}

const updateData = async (valueData: Prisma.TelefonosUncheckedUpdateInput): Promise<Prisma.TelefonosUncheckedUpdateInput | errorInterno> => {
  const datos: Prisma.TelefonosUncheckedUpdateInput | errorInterno = await databaseService.telefonos.update({
    where: {
      codigoTelefonos: valueData.codigoTelefonos as number,
      numeroDocumento: valueData.numeroDocumento as string
    },
    data: valueData
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_UPDATE, ErrorDetail: err.message } })

  return datos
}

const deleteData = async (codigo: number): Promise<Telefonos | errorInterno> => {
  const datos: Telefonos | errorInterno = await databaseService.telefonos.delete({
    where: {
      codigoTelefonos: codigo
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_ELIMINAR, ErrorDetail: err.message } })

  return datos
}

export default { getAllData, createData, updateData, deleteData }