import { ControlSueldoPuestos, Prisma } from '@prisma/client'
import { bdErrors } from '../../../enums/dbError.enums'
import databaseService from '../../../database/database.services'
import { errorInterno } from '../../../types/errorTypes'

const getAllData = async (): Promise<ControlSueldoPuestos[] | errorInterno> => {
  const datos: ControlSueldoPuestos[] | errorInterno = await databaseService.controlSueldoPuestos.findMany()
    .catch(err => { return { ErrorInterno: bdErrors.ERROR_GET_ALL, ErrorDetail: err.message } })

  return datos
}

const getDataID = async (id: number): Promise<ControlSueldoPuestos | errorInterno | null> => {
  const datos: ControlSueldoPuestos | errorInterno | null = await databaseService.controlSueldoPuestos.findFirst({
    where: {
      codigoControl: id
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_GET, ErrorDetail: err.message } })
  return datos
}

const createData = async (datos: Prisma.ControlSueldoPuestosCreateManyInput): Promise<Prisma.ControlSueldoPuestosCreateManyInput | errorInterno> => {
  const data: Prisma.ControlSueldoPuestosCreateManyInput | errorInterno = await databaseService.controlSueldoPuestos.create({
    data: datos
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_INSERT, ErrorDetail: err.message } })

  return data

}

const updateData = async (valueData: Prisma.ControlSueldoPuestosUncheckedUpdateInput): Promise<Prisma.ControlSueldoPuestosUncheckedUpdateInput | errorInterno> => {

  const codigo: Prisma.ControlSueldoPuestosUncheckedUpdateInput = {
    codigoEmpresa: valueData.codigoEmpresa,
    codigoSucu: valueData.codigoSucu

  }
  const datos: Prisma.ControlSueldoPuestosUpdateInput | errorInterno = await databaseService.controlSueldoPuestos.update({
    where: {
      codigoControl: valueData.codigoControl as number
    },
    data: valueData
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_UPDATE, ErrorDetail: err.message } })

  return datos
}

const deleteData = async (codigo: number): Promise<ControlSueldoPuestos | errorInterno> => {
  const datos: ControlSueldoPuestos | errorInterno = await databaseService.controlSueldoPuestos.delete({
    where: {
      codigoControl: codigo
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_ELIMINAR, ErrorDetail: err.message } })

  return datos
}

export default { getAllData, getDataID, createData, updateData, deleteData }