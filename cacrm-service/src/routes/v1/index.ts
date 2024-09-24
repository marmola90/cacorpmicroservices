import { Router } from 'express'
import { readdirSync } from 'fs'

const PATH_ROUTER = `${__dirname}`

const router = Router()

const cleanFilename = (fileName: string): string => {
  const file: string | any = fileName.split('.').shift()
  return file
}
readdirSync(PATH_ROUTER).filter(async (filename) => {
  const cleanName: string = cleanFilename(filename)
  if (cleanName !== 'index') {
    await import(`./${cleanName}`).then((moduleRouter) => {
      console.log(`Se esta cargando la ruta ...... ${cleanName}`)
      router.use(`/${cleanName}`, moduleRouter.router)
    })
  }
})

export { router }
