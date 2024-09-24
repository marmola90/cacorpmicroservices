import express from 'express'
import * as empresasController from '../../controllers/v1/empresas.controller'
import { checkSession } from '../../middleware/session'

const router = express.Router()

router.get('/getAllEmpresas', checkSession, empresasController.getAllEmpresas)
router.get('/getEmpresa/:codEmpresa', checkSession, empresasController.getEmpresa)
router.post('/createEmpresa', empresasController.createEmpresa)
router.put('/updateEmpresa', checkSession, empresasController.updateEmpresa)
router.delete('/deleteEmpresa/:codEmpresa', checkSession, empresasController.deleteEmpresa)

export { router }