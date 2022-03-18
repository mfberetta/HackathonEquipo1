import controllerSoft from '../controllers/soft.js'
import { authentication } from '../../utils/jwt.js'

/*-----------------------------------------------------------*/
import express from 'express'
const { Router } = express
const routerSoft = new Router()
routerSoft.use(express.json())
routerSoft.use(express.urlencoded({ extended: true }))
    /*-----------------------------------------------------------*/
    //Manejador de permisos a nivel de rutas

    /*-----------------------------------------------------------*/
    //Manejador de error a nivel router
routerSoft.use((err, req, res, next) => {
        logger.error(err)
        res.status(500).json({ error: 'Algo salio mal...' })
    })
    /*-----------------------------------------------------------*/
    // Rutas de API
    //GET -> devuelve todos los productos
routerSoft.get('/', authentication,controllerSoft.getByEmailSoftApi)

//POST -> recibe y agrega un producto, y lo devuelve con su id asignado.
routerSoft.post('/', authentication, controllerSoft.postSoftApi)

//DELETE /:id -> elimina un producto según su id.
routerSoft.delete('/:query', authentication, controllerSoft.deleteByIdSoftApi)

//PUT /:id -> recibe y actualiza un producto según su id.
routerSoft.put('/:query', authentication, controllerSoft.putByIdSoftApi)

/*-----------------------------------------------------------*/

export default routerSoft