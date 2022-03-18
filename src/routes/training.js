import controllerTraining from '../controllers/training.js'
import {authentication} from '../../utils/jwt.js'
import config from '../../config/config.js'
/*-----------------------------------------------------------*/
import express from 'express'
const { Router } = express
const routerTraining = new Router()
routerTraining.use(express.json())
routerTraining.use(express.urlencoded({ extended: true }))
/*-----------------------------------------------------------*/
//Manejador de permisos a nivel de rutas
routerTraining.use((req, res, next) => {
    if(!config.getUserRol()){ //Si no es usuario admin chequea las rutas que un usuario normal no tiene acceso
        if((req.baseUrl == '/api/productos') && (req.method == 'POST')){ //Agregar
            return res.status(403).send({ error: -1, descripcion: 'ruta ' + req.baseUrl + ' metodo ' + req.method + ' no autorizada' })
        }
        if((req.baseUrl == '/api/productos') && (req.method == 'PUT')){ //Modificar
            return res.status(403).send({ error: -1, descripcion: 'ruta ' + req.baseUrl + ' metodo ' + req.method + ' no autorizada' })
        }
        if((req.baseUrl == '/api/productos') && (req.method == 'DELETE')){ //Elininar
            return res.status(403).send({ error: -1, descripcion: 'ruta ' + req.baseUrl + ' metodo ' + req.method + ' no autorizada' })
        }
    }
    next()
})
/*-----------------------------------------------------------*/
//Manejador de error a nivel router
routerTraining.use((err, req, res, next) => {
    logger.error(err)
    res.status(500).json({ error: 'Algo salio mal...' })
})
/*-----------------------------------------------------------*/
// Rutas de API
//GET -> Get info of courses by email user
routerTraining.get('/', authentication, controllerTraining.getByEmailCoursesApi)

/*-----------------------------------------------------------*/

export default routerTraining