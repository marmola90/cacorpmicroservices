import { Permisos, PermisosOtorgados, Prisma, Role } from "@prisma/client"
import { Request } from "express"

export const permisoIdAdapter = (req: Request): number => {
  const { codPermiso } = req.body
  const codigoPermiso: number = codPermiso
  return codigoPermiso
}

export const permisoIdAdapterParam = (req: Request): number => {
  const { codPermiso } = req.params
  const codigoPermiso: number = parseInt(codPermiso)
  return codigoPermiso
}

export const permisosAdapter = (req: Request): string => {
  const { descripcion } = req.body
  const descripcionPermisos: string = descripcion
  return descripcionPermisos
}

export const permisosAdpaterUpdate = (req: Request): Prisma.PermisosUncheckedUpdateWithoutPermisosOtorInput => {
  const { datos } = req.body
  const permisosVars: Prisma.PermisosUncheckedUpdateWithoutPermisosOtorInput = {
    codigoPermiso: datos?.codigo,
    descripcionPermisos: datos?.descripcion
  }

  return permisosVars
}

export const permisosAsignarAdapter = (req: Request): PermisosOtorgados => {
  const { datos } = req.body
  const permisosAsignados: PermisosOtorgados = {
    codigoPermiso: datos.codigo,
    role: datos.rol
  }

  return permisosAsignados
}

export const permisosAsignarAdapterParams = (req: Request): Prisma.PermisosOtorgadosCodigoPermisoRoleCompoundUniqueInput => {
  const { codigo, rol } = req.params
  const permisosAsignados: Prisma.PermisosOtorgadosCodigoPermisoRoleCompoundUniqueInput = {
    codigoPermiso: parseInt(codigo),
    role: rol as Role
  }

  return permisosAsignados
}