import { CarteraEmpleado, Prisma } from '@prisma/client'
import { bdErrors } from '../../../enums/dbError.enums'
import databaseService from '../../../database/database.services'
import { errorInterno } from '../../../types/errorTypes'

const getAllData = async (): Promise<CarteraEmpleado[] | errorInterno> => {
  const datos: CarteraEmpleado[] | errorInterno = await databaseService.carteraEmpleado.findMany()
    .catch(err => { return { ErrorInterno: bdErrors.ERROR_GET_ALL, ErrorDetail: err.message } })

  return datos
}

const getDataID = async (id: number): Promise<CarteraEmpleado | errorInterno | null> => {
  const datos: CarteraEmpleado | errorInterno | null = await databaseService.carteraEmpleado.findFirst({
    where: {
      numeroEmpleado: id
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_GET, ErrorDetail: err.message } })
  return datos
}

const createData = async (datos: Prisma.CarteraEmpleadoCreateManyInput): Promise<Prisma.CarteraEmpleadoCreateManyInput | errorInterno> => {
  const data: Prisma.CarteraEmpleadoCreateManyInput | errorInterno = await databaseService.carteraEmpleado.create({
    data: datos
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_INSERT, ErrorDetail: err.message } })

  return data

}

const updateData = async (valueData: Prisma.CarteraEmpleadoUncheckedUpdateInput): Promise<Prisma.CarteraEmpleadoUncheckedUpdateInput | errorInterno> => {
  const codi: Prisma.CarteraEmpleadoCodigoCarteraNumeroEmpleadoCompoundUniqueInput = {
    codigoCartera: valueData.codigoCartera as number,
    numeroEmpleado: valueData.numeroEmpleado as number
  }

  const datos: Prisma.CarteraEmpleadoUncheckedUpdateInput | errorInterno = await databaseService.carteraEmpleado.update({
    where: {
      codigoCartera_numeroEmpleado: codi
    },
    data: valueData
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_UPDATE, ErrorDetail: err.message } })

  return datos
}

const deleteData = async (codigo: Prisma.CarteraEmpleadoCodigoCarteraNumeroEmpleadoCompoundUniqueInput): Promise<CarteraEmpleado | errorInterno> => {
  const datos: CarteraEmpleado | errorInterno = await databaseService.carteraEmpleado.delete({
    where: {
      codigoCartera_numeroEmpleado: codigo
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_ELIMINAR, ErrorDetail: err.message } })

  return datos
}

export default { getAllData, getDataID, createData, updateData, deleteData }