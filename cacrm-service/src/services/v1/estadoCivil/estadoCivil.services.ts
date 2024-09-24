import { EstadoCivil, Prisma } from '@prisma/client'
import { bdErrors } from '../../../enums/dbError.enums'
import databaseService from '../../../database/database.services'
import { errorInterno } from '../../../types/errorTypes'

const getAllEC = async (): Promise<EstadoCivil[] | errorInterno> => {
  const datos: EstadoCivil[] | errorInterno = await databaseService.estadoCivil.findMany()
    .catch(err => { return { ErrorInterno: bdErrors.ERROR_GET_ALL, ErrorDetail: err.message } })

  return datos
}

const getECID = async (id: number): Promise<EstadoCivil | errorInterno | null> => {
  const datos: EstadoCivil | errorInterno | null = await databaseService.estadoCivil.findFirst({
    where: {
      codigoEC: id
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_GET, ErrorDetail: err.message } })
  return datos
}

const createEC = async (datos: Prisma.EstadoCivilCreateWithoutDatosPersonalesInput): Promise<Prisma.EstadoCivilCreateWithoutDatosPersonalesInput | errorInterno> => {
  const datosTP: Prisma.EstadoCivilCreateWithoutDatosPersonalesInput | errorInterno = await databaseService.estadoCivil.create({
    data: datos
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_INSERT, ErrorDetail: err.message } })

  return datosTP

}

const updateEC = async (valueTP: Prisma.EstadoCivilUncheckedUpdateWithoutDatosPersonalesInput): Promise<Prisma.EstadoCivilUncheckedUpdateWithoutDatosPersonalesInput | errorInterno> => {
  const datos: Prisma.EstadoCivilUncheckedUpdateWithoutDatosPersonalesInput | errorInterno = await databaseService.estadoCivil.update({
    where: {
      codigoEC: valueTP.codigoEC as number
    },
    data: valueTP
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_UPDATE, ErrorDetail: err.message } })

  return datos
}

const deleteEC = async (codigoTP: number): Promise<EstadoCivil | errorInterno> => {
  const datos: EstadoCivil | errorInterno = await databaseService.estadoCivil.delete({
    where: {
      codigoEC: codigoTP
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_ELIMINAR, ErrorDetail: err.message } })

  return datos
}

export default { getAllEC, getECID, createEC, updateEC, deleteEC }