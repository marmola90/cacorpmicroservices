import { Parentesco, Prisma } from '@prisma/client'
import { bdErrors } from '../../../enums/dbError.enums'
import databaseService from '../../../database/database.services'
import { errorInterno } from '../../../types/errorTypes'

const getAllParentesco = async (): Promise<Parentesco[] | errorInterno> => {
  const datos: Parentesco[] | errorInterno = await databaseService.parentesco.findMany()
    .catch(err => { return { ErrorInterno: bdErrors.ERROR_GET_ALL, ErrorDetail: err.message } })

  return datos
}

const getParentescoID = async (id: number): Promise<Parentesco | errorInterno | null> => {
  const datos: Parentesco | errorInterno | null = await databaseService.parentesco.findFirst({
    where: {
      codigoParentesco: id
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_GET, ErrorDetail: err.message } })
  return datos
}

const createParentesco = async (datos: Prisma.ParentescoCreateWithoutDatosFamiliaresInput): Promise<Prisma.ParentescoCreateWithoutDatosFamiliaresInput | errorInterno> => {
  const datosParentesco: Prisma.ParentescoCreateWithoutDatosFamiliaresInput | errorInterno = await databaseService.parentesco.create({
    data: datos
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_INSERT, ErrorDetail: err.message } })

  return datosParentesco

}

const updateParentesco = async (valueParentesco: Prisma.ParentescoUncheckedUpdateWithoutDatosFamiliaresInput): Promise<Prisma.ParentescoUncheckedUpdateWithoutDatosFamiliaresInput | errorInterno> => {
  const datos: Prisma.ParentescoUncheckedUpdateWithoutDatosFamiliaresInput | errorInterno = await databaseService.parentesco.update({
    where: {
      codigoParentesco: valueParentesco.codigoParentesco as number
    },
    data: valueParentesco
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_UPDATE, ErrorDetail: err.message } })

  return datos
}

const deleteParentesco = async (codigoParentesco: number): Promise<Parentesco | errorInterno> => {
  const datos: Parentesco | errorInterno = await databaseService.parentesco.delete({
    where: {
      codigoParentesco: codigoParentesco
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_ELIMINAR, ErrorDetail: err.message } })

  return datos
}

export default { getAllParentesco, getParentescoID, createParentesco, updateParentesco, deleteParentesco }