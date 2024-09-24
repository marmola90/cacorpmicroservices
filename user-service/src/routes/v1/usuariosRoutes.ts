import express from 'express'
import * as usuariosController from '../../controllers/v1/usuarios.controller'
import { checkSession } from '../../middleware/session'

const router = express.Router()

router.get('/getAllUsers', checkSession, usuariosController.getAllUsers)
router.get('/getUser/:username', checkSession, usuariosController.getUsuario)
router.post('/createUser', usuariosController.createUser)
router.put('/updateUser', checkSession, usuariosController.updateUser)
router.delete('/deleteUser/:username', checkSession, usuariosController.deleteUser)

export { router }