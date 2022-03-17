import controllerSoft from '../controllers/soft.js'
import { authentication } from '../../utils/jwt.js'
import config from '../../config/config.js'
/*-----------------------------------------------------------*/
import express from 'express'
const { Router } = express
const routerSoft = new Router()
routerSoft.use(express.json())
routerSoft.use(express.urlencoded({ extended: true }))
    /*-----------------------------------------------------------*/
    //Manejador de permisos a nivel de rutas
routerSoft.use((req, res, next) => {
        if (!config.getUserRol()) { //Si no es usuario admin chequea las rutas que un usuario normal no tiene acceso
            if ((req.baseUrl == '/api/soft') && (req.method == 'POST')) { //Agregar
                return res.status(403).send({ error: -1, descripcion: 'ruta ' + req.baseUrl + ' metodo ' + req.method + ' no autorizada' })
            }
            if ((req.baseUrl == '/api/soft') && (req.method == 'PUT')) { //Modificar
                return res.status(403).send({ error: -1, descripcion: 'ruta ' + req.baseUrl + ' metodo ' + req.method + ' no autorizada' })
            }
            if ((req.baseUrl == '/api/soft') && (req.method == 'DELETE')) { //Elininar
                return res.status(403).send({ error: -1, descripcion: 'ruta ' + req.baseUrl + ' metodo ' + req.method + ' no autorizada' })
            }
        }
        next()
    })
    /*-----------------------------------------------------------*/
    //Manejador de error a nivel router
routerSoft.use((err, req, res, next) => {
        logger.error(err)
        res.status(500).json({ error: 'Algo salio mal...' })
    })
    /*-----------------------------------------------------------*/
    // Rutas de API
    //GET -> devuelve todos los productos
routerSoft.get('/', controllerSoft.getByEmailSoftApi)



//POST -> recibe y agrega un producto, y lo devuelve con su id asignado.
routerSoft.post('/', authentication, controllerSoft.postSoftApi)

//DELETE /:id -> elimina un producto según su id.
routerSoft.delete('/:id', authentication, controllerSoft.deleteByIdSoftApi)

//PUT /:id -> recibe y actualiza un producto según su id.
routerSoft.put('/:id', authentication, controllerSoft.putByIdSoftApi)

/*-----------------------------------------------------------*/

export default routerSoft