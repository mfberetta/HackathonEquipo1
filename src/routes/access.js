import controllerAccess from '../controllers/access.js'
import {authentication} from '../../utils/jwt.js'
import config from '../../config/config.js'
/*-----------------------------------------------------------*/
import express from 'express'
const { Router } = express
const routerAccess = new Router()
routerAccess.use(express.json())
routerAccess.use(express.urlencoded({ extended: true }))
/*-----------------------------------------------------------*/
//Manejador de permisos a nivel de rutas
//routerAccess.use((req, res, next) => {
//    if(!config.getUserRol()){ //Si no es usuario admin chequea las rutas que un usuario normal no tiene acceso
//        if((req.baseUrl == '/api/access') && (req.method == 'POST')){ //Agregar
//            return res.status(403).send({ error: -1, descripcion: 'ruta ' + req.baseUrl + ' metodo ' + req.method + ' no autorizada' })
//        }
//        if((req.baseUrl == '/api/access') && (req.method == 'PUT')){ //Modificar
//            return res.status(403).send({ error: -1, descripcion: 'ruta ' + req.baseUrl + ' metodo ' + req.method + ' no autorizada' })
//        }
//        if((req.baseUrl == '/api/access') && (req.method == 'DELETE')){ //Elininar
//            return res.status(403).send({ error: -1, descripcion: 'ruta ' + req.baseUrl + ' metodo ' + req.method + ' no autorizada' })
//        }
//    }
//    next()
//})
/*-----------------------------------------------------------*/
//Manejador de error a nivel router
routerAccess.use((err, req, res, next) => {
    logger.error(err)
    res.status(500).json({ error: 'Algo salio mal...' })
})
/*-----------------------------------------------------------*/
// Rutas de API
//GET -> devuelve todos los accesos de un usuario
routerAccess.get('/',authentication,controllerAccess.getAccessApi)
 
//POST -> recibe y agrega accesos, y lo devuelve con su id asignado.
routerAccess.post('/', authentication,controllerAccess.postAccessApi)

//DELETE /:id -> elimina accesos.
//routerAccess.delete('/', authentication,controllerAccess.deleteAccessApi)

//PUT /:id -> recibe y actualiza accesos.
//routerAccess.put('/', authentication,controllerAccess.putAccessApi)

/*-----------------------------------------------------------*/

export default routerAccess