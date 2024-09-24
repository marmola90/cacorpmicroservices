import { Prisma, TituloProfesion } from '@prisma/client'
import databaseService from '../../../database/database.services'
import { errorInterno } from '../../../types/errorTypes'
import { bdErrors } from '../../../enums/dbError.enums'

const getAllTitulo = async (): Promise<TituloProfesion[] | errorInterno> => {
  const datos: TituloProfesion[] | errorInterno = await databaseService.tituloProfesion.findMany()
    .catch(err => { return { ErrorInterno: bdErrors.ERROR_GET_ALL, ErrorDetail: err.message } })

  return datos
}

const getTituloID = async (id: number): Promise<TituloProfesion | errorInterno | null> => {
  const datos: TituloProfesion | errorInterno | null = await databaseService.tituloProfesion.findFirst({
    where: {
      codigoTP: id
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_GET, ErrorDetail: err.message } })
  return datos
}

const createTitulo = async (datos: Prisma.TituloProfesionCreateWithoutDatosPersonalesInput): Promise<Prisma.TituloProfesionCreateWithoutDatosPersonalesInput | errorInterno> => {
  const datosTP: Prisma.TituloProfesionCreateWithoutDatosPersonalesInput | errorInterno = await databaseService.tituloProfesion.create({
    data: datos
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_INSERT, ErrorDetail: err.message } })

  return datosTP

}

const updateTitulo = async (valueTP: Prisma.TituloProfesionUncheckedUpdateWithoutDatosPersonalesInput): Promise<Prisma.TituloProfesionUncheckedUpdateWithoutDatosPersonalesInput | errorInterno> => {
  const datos: Prisma.TituloProfesionUncheckedUpdateWithoutDatosPersonalesInput | errorInterno = await databaseService.tituloProfesion.update({
    where: {
      codigoTP: valueTP.codigoTP as number
    },
    data: valueTP
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_UPDATE, ErrorDetail: err.message } })

  return datos
}

const deleteTitulo = async (codigoTP: number): Promise<TituloProfesion | errorInterno> => {
  const datos: TituloProfesion | errorInterno = await databaseService.tituloProfesion.delete({
    where: {
      codigoTP: codigoTP
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_ELIMINAR, ErrorDetail: err.message } })

  return datos
}

export default { getAllTitulo, getTituloID, createTitulo, updateTitulo, deleteTitulo }