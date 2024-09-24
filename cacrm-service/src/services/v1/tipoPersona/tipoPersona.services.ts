import { TipoPersona, Prisma } from '@prisma/client'
import { bdErrors } from '../../../enums/dbError.enums'
import databaseService from '../../../database/database.services'
import { errorInterno } from '../../../types/errorTypes'

const getAllTipoPersona = async (): Promise<TipoPersona[] | errorInterno> => {
  const datos: TipoPersona[] | errorInterno = await databaseService.tipoPersona.findMany()
    .catch(err => { return { ErrorInterno: bdErrors.ERROR_GET_ALL, ErrorDetail: err.message } })

  return datos
}

const getTipoPersonaID = async (id: number): Promise<TipoPersona | errorInterno | null> => {
  const datos: TipoPersona | errorInterno | null = await databaseService.tipoPersona.findFirst({
    where: {
      codigoTipoPersona: id
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_GET, ErrorDetail: err.message } })
  return datos
}

const createTipoPersona = async (datos: Prisma.TipoPersonaCreateWithoutDatosPersonalesInput): Promise<Prisma.TipoPersonaCreateWithoutDatosPersonalesInput | errorInterno> => {
  const datosTP: Prisma.TipoPersonaCreateWithoutDatosPersonalesInput | errorInterno = await databaseService.tipoPersona.create({
    data: datos
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_INSERT, ErrorDetail: err.message } })

  return datosTP

}

const updateTipoPersona = async (valueTP: Prisma.TipoPersonaUncheckedUpdateWithoutDatosPersonalesInput): Promise<Prisma.TipoPersonaUncheckedUpdateWithoutDatosPersonalesInput | errorInterno> => {
  const datos: Prisma.TipoPersonaUncheckedUpdateWithoutDatosPersonalesInput | errorInterno = await databaseService.tipoPersona.update({
    where: {
      codigoTipoPersona: valueTP.codigoTipoPersona as number
    },
    data: valueTP
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_UPDATE, ErrorDetail: err.message } })

  return datos
}

const deleteTipoPersona = async (codigoTP: number): Promise<TipoPersona | errorInterno> => {
  const datos: TipoPersona | errorInterno = await databaseService.tipoPersona.delete({
    where: {
      codigoTipoPersona: codigoTP
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_ELIMINAR, ErrorDetail: err.message } })

  return datos
}

export default { getAllTipoPersona, getTipoPersonaID, createTipoPersona, updateTipoPersona, deleteTipoPersona }