import { Permisos, PermisosOtorgados, Prisma } from '@prisma/client'
import { bdErrors } from '../../../enums/dbError.enums'
import databaseService from '../../../database/database.services'
import { errorInterno } from '../../../types/errorTypes'

const getAllPermisos = async (): Promise<Permisos[] | errorInterno> => {
  const listaPermisos: Permisos[] | errorInterno = await databaseService.permisos.findMany()
    .catch(err => { return { ErrorInterno: bdErrors.ERROR_GET_ALL, ErrorDetail: err.message } })

  return listaPermisos
}

const getPermiso = async (id: number): Promise<Permisos | errorInterno | null> => {
  const datoPermisos: Permisos | errorInterno | null = await databaseService.permisos.findFirst({
    where: {
      codigoPermiso: id
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_GET, ErrorDetail: err.message } })
  return datoPermisos
}

const createPermisos = async (datos: string): Promise<Prisma.PermisosCreateWithoutPermisosOtorInput | errorInterno> => {
  const permiso: Prisma.PermisosCreateWithoutPermisosOtorInput | errorInterno = await databaseService.permisos.create({
    data: {
      descripcionPermisos: datos
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_INSERT, ErrorDetail: err.message } })

  return permiso

}

const updatePermisos = async (valueEmp: Prisma.PermisosUncheckedUpdateWithoutPermisosOtorInput): Promise<Prisma.PermisosUncheckedUpdateWithoutPermisosOtorInput | errorInterno> => {
  const datos: Prisma.PermisosUncheckedUpdateWithoutPermisosOtorInput | errorInterno = await databaseService.permisos.update({
    where: {
      codigoPermiso: valueEmp.codigoPermiso as number
    },
    data: {
      descripcionPermisos: valueEmp.descripcionPermisos
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_UPDATE, ErrorDetail: err.message } })

  return datos
}

const deletePermisos = async (codEmpresa: number): Promise<Permisos | errorInterno> => {
  const datos: Permisos | errorInterno = await databaseService.permisos.delete({
    where: {
      codigoPermiso: codEmpresa
    }
  }).catch(err => { return { ErrorInterno: bdErrors.ERROR_ELIMINAR, ErrorDetail: err.message } })

  return datos
}

const getAllPermisosOtorgados = async (): Promise<PermisosOtorgados[] | errorInterno> => {
  const listaPermisos: PermisosOtorgados[] | errorInterno = await databaseService.permisosOtorgados.findMany()
    .catch(err => { return { ErrorInterno: bdErrors.ERROR_GET_ALL, ErrorDetail: err.message } })

  return listaPermisos
}

const asignarPermisos = async (datosPermisos: PermisosOtorgados): Promise<PermisosOtorgados | errorInterno> => {
  const datos: PermisosOtorgados | errorInterno = await databaseService.permisosOtorgados.create({
    data: datosPermisos
  })
  return datos
}

const deletePermisosOtorgados = async (datosPermisos: Prisma.PermisosOtorgadosCodigoPermisoRoleCompoundUniqueInput): Promise<Prisma.PermisosOtorgadosCodigoPermisoRoleCompoundUniqueInput | errorInterno> => {
  const datos: Prisma.PermisosOtorgadosCodigoPermisoRoleCompoundUniqueInput | errorInterno = await databaseService.permisosOtorgados.delete({
    where: {
      codigoPermiso: datosPermisos.codigoPermiso,
      role: datosPermisos.role
    }
  })
  return datos
}
export default { getAllPermisos, getPermiso, createPermisos, updatePermisos, deletePermisos, asignarPermisos, deletePermisosOtorgados, getAllPermisosOtorgados }