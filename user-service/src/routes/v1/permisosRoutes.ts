import express from 'express'
import * as permisosControllers from '../../controllers/v1/permisos.controller'
import { checkSession } from '../../middleware/session'

const router = express.Router()

router.get('/getAllPermisos', checkSession, permisosControllers.getAllPermisos)
router.get('/getPermisos/:codigo', checkSession, permisosControllers.getPermisos)
router.get('/getAllPermisosOtorgados', checkSession, permisosControllers.getAllPermisosOtorgados)
router.post('/createPermisos', checkSession, permisosControllers.createPermisos)
router.post('/asignarPermisos', checkSession, permisosControllers.asignarPermisos)
router.put('/updatePermisos', checkSession, permisosControllers.updatePermisos)
router.delete('/deletePermisos/:codigo', checkSession, permisosControllers.deletePermisos)
router.delete('/deletePermisosOtorgados/:codigo/:rol', checkSession, permisosControllers.deletePermisosOtorgados)

export { router }