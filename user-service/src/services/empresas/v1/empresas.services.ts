import { Empresa, Prisma } from '@prisma/client'
import { bdErrors } from '../../../enums/dbError.enums'
import databaseService from '../../../database/database.services'
import { errorInterno } from '../../../types/errorTypes'
import { deleteImage } from '../../../utils/cloudi.utils'

const getAllEmpresas = async (): Promise<Empresa[] | errorInterno> => {
  const datosEmpresa: Empresa[] | errorInterno = await databaseService.empresa.findMany()
    .catch(err => { return { ErrorInterno: bdErrors.ERROR_GET_ALL, ErrorDetail: err.message } })

  return datosEmpresa
}

const getEmpresaId = async (id: number): Promise<Empresa | errorInterno | null> => {
  const datoEmpresa: Empresa | errorInterno | null = await databaseService.empresa.findFirst({
    where: {
      codigo: id
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_GET, ErrorDetail: err.message } })
  return datoEmpresa
}

const createEmpresa = async (datos: Prisma.EmpresaCreateWithoutUserInput): Promise<Prisma.EmpresaCreateWithoutUserInput | errorInterno> => {
  const empresa: Prisma.EmpresaCreateWithoutUserInput | errorInterno = await databaseService.empresa.create({
    data: datos
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_INSERT, ErrorDetail: err.message } })

  return empresa

}

const updateEmpresa = async (valueEmp: Prisma.EmpresaUncheckedUpdateWithoutUserInput): Promise<Prisma.EmpresaUncheckedUpdateWithoutUserInput | errorInterno> => {
  const datos: Prisma.EmpresaUncheckedCreateWithoutUserInput | errorInterno = await databaseService.empresa.update({
    where: {
      codigo: valueEmp.codigo as number
    },
    data: valueEmp
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_UPDATE, ErrorDetail: err.message } })

  return datos
}

const deleteEmpresa = async (codEmpresa: number): Promise<Empresa | errorInterno> => {
  const empresaLogo = await getEmpresaId(codEmpresa)
  const { logoName } = empresaLogo as Empresa
  deleteImage(logoName)
  const datos: Empresa | errorInterno = await databaseService.empresa.delete({
    where: {
      codigo: codEmpresa
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_ELIMINAR, ErrorDetail: err.message } })

  return datos
}

export default { getAllEmpresas, getEmpresaId, createEmpresa, updateEmpresa, deleteEmpresa }