import { EnlaceCartera, Prisma } from '@prisma/client'
import { bdErrors } from '../../../enums/dbError.enums'
import databaseService from '../../../database/database.services'
import { errorInterno } from '../../../types/errorTypes'

const getAllData = async (): Promise<EnlaceCartera[] | errorInterno> => {
  const datos: EnlaceCartera[] | errorInterno = await databaseService.enlaceCartera.findMany()
    .catch(err => { return { ErrorInterno: bdErrors.ERROR_GET_ALL, ErrorDetail: err.message } })

  return datos
}

const getDataID = async (id: string): Promise<EnlaceCartera | errorInterno | null> => {
  const datos: EnlaceCartera | errorInterno | null = await databaseService.enlaceCartera.findFirst({
    where: {
      numeroDocumento: id
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_GET, ErrorDetail: err.message } })
  return datos
}

const createData = async (datos: Prisma.EnlaceCarteraCreateManyInput): Promise<Prisma.EnlaceCarteraCreateManyInput | errorInterno> => {
  const data: Prisma.EnlaceCarteraCreateManyInput | errorInterno = await databaseService.enlaceCartera.create({
    data: datos
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_INSERT, ErrorDetail: err.message } })

  return data

}

const updateData = async (valueData: Prisma.EnlaceCarteraUncheckedUpdateInput): Promise<Prisma.EnlaceCarteraUncheckedUpdateInput | errorInterno> => {


  const datos: Prisma.EnlaceCarteraUncheckedUpdateInput | errorInterno = await databaseService.enlaceCartera.update({
    where: {
      codigoEnlace: valueData.codigoEnlace as number
    },
    data: valueData
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_UPDATE, ErrorDetail: err.message } })

  return datos
}

const deleteData = async (codigo: string): Promise<EnlaceCartera | errorInterno> => {
  const datos: EnlaceCartera | errorInterno = await databaseService.enlaceCartera.delete({
    where: {
      numeroDocumento: codigo
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_ELIMINAR, ErrorDetail: err.message } })

  return datos
}

export default { getAllData, getDataID, createData, updateData, deleteData }