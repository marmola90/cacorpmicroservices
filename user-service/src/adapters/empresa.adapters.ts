import { Prisma } from "@prisma/client"
import { Request } from "express"
import { urlImage } from "../types/cloudiImageUrlTypes"

export const empresaIdAdapter = (req: Request): number => {
  const { codEmpresa } = req.body
  const codigo: number = codEmpresa
  return codigo
}

export const empresaIdAdapterParams = (req: Request): number => {
  const { codEmpresa } = req.params
  const codigo: number = parseInt(codEmpresa)
  return codigo
}

export const empresaTransformAdapter = async (req: Request, urlIm: urlImage): Promise<Prisma.EmpresaCreateWithoutUserInput> => {
  const { datos } = req.body
  const datosEmpresa: Prisma.EmpresaCreateWithoutUserInput = {
    descripcion: datos.descripcion,
    logo: urlIm.url,
    logoName: urlIm.public_id
  }
  return datosEmpresa
}

export const empresaTransformAdapterUpdate = async (req: Request, urlIm: urlImage | null): Promise<Prisma.EmpresaUncheckedUpdateWithoutUserInput> => {
  const { datos } = req.body

  const datosEmpresa: Prisma.EmpresaUncheckedUpdateWithoutUserInput = {
    codigo: datos?.codEmpresa,
    descripcion: datos?.descripcion,
    logo: urlIm?.url,
    logoName: urlIm?.public_id
  }

  return datosEmpresa
}