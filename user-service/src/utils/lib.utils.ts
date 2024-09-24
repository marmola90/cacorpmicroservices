import bcrypt from "bcryptjs";

export const JSONParse = (envValue: string | undefined): any => {
  const valor = JSON.parse(envValue as string)
  return valor
}

export const encryptPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(12)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

export const decryptPassword = (password: string, hashPass: string | any): boolean => {
  return bcrypt.compareSync(password, hashPass)
}