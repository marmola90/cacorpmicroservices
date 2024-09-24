import { Bancos, Prisma } from '@prisma/client'
import { bdErrors } from '../../../enums/dbError.enums'
import databaseService from '../../../database/database.services'
import { errorInterno } from '../../../types/errorTypes'

const getAllData = async (): Promise<Bancos[] | errorInterno> => {
  const datos: Bancos[] | errorInterno = await databaseService.bancos.findMany()
    .catch(err => { return { ErrorInterno: bdErrors.ERROR_GET_ALL, ErrorDetail: err.message } })

  return datos
}

const getDataID = async (id: number): Promise<Bancos | errorInterno | null> => {
  const datos: Bancos | errorInterno | null = await databaseService.bancos.findFirst({
    where: {
      codigo: id
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_GET, ErrorDetail: err.message } })
  return datos
}

const createData = async (datos: Prisma.BancosCreateWithoutCuenaBancariaInput): Promise<Prisma.BancosCreateWithoutCuenaBancariaInput | errorInterno> => {
  const data: Prisma.BancosCreateWithoutCuenaBancariaInput | errorInterno = await databaseService.bancos.create({
    data: datos
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_INSERT, ErrorDetail: err.message } })

  return data

}

const updateData = async (valueData: Prisma.BancosUncheckedUpdateWithoutCuenaBancariaInput): Promise<Prisma.BancosUncheckedUpdateWithoutCuenaBancariaInput | errorInterno> => {
  const datos: Prisma.BancosUncheckedUpdateWithoutCuenaBancariaInput | errorInterno = await databaseService.bancos.update({
    where: {
      codigo: valueData.codigo as number
    },
    data: valueData
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_UPDATE, ErrorDetail: err.message } })

  return datos
}

const deleteData = async (codigo: number): Promise<Bancos | errorInterno> => {
  const datos: Bancos | errorInterno = await databaseService.bancos.delete({
    where: {
      codigo: codigo
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_ELIMINAR, ErrorDetail: err.message } })

  return datos
}

export default { getAllData, getDataID, createData, updateData, deleteData }