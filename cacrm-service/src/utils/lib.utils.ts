export const JSONParse = (envValue: string | undefined): any => {
  const valor = JSON.parse(envValue as string)
  return valor
}