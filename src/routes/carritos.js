import controllerCarritos from '../controllers/carrito.js'
import {authentication} from '../../utils/jwt.js'
/*-----------------------------------------------------------*/
import express from 'express'
const { Router } = express
const routerCarritos = new Router()
routerCarritos.use(express.json())
routerCarritos.use(express.urlencoded({ extended: true }))
/*-----------------------------------------------------------*/
//Manejador de error a nivel router
routerCarritos.use((err, req, res, next) => {
    logger.error(err)
    res.status(500).json({ error: 'Algo salio mal...' })
})
/*-----------------------------------------------------------*/
//Rutas de API
//GET -> devuelve todos los carritos
routerCarritos.get('/',authentication,controllerCarritos.getCarritosApi)

//GET :id/carrito -> devuelve un carrito según su id.
routerCarritos.get('/:id', authentication,controllerCarritos.getByIdCarritosApi)

//GET :id/productos -> devuelve los productos de un carrito según su id.
routerCarritos.get('/:id/productos', authentication,controllerCarritos.getProductosByIdCarritosApi)

//POST -> recibe y agrega un carrito, y lo devuelve con su id asignado.
routerCarritos.post('/', authentication,controllerCarritos.postCarritosApi)

//DELETE /:id -> vacia y elimina un carrito según su id.
routerCarritos.delete('/:id', authentication,controllerCarritos.deleteByIdCarritosApi)

//DELETE /:id/productos/:id_prod -> elimina un producto del carrito
routerCarritos.delete('/:id/productos/:id_prod', authentication,controllerCarritos.deleteByIdProductosByIdCarritosApi)

//POST :id/productos -> recibe el producto y lo agrega a un carrito según su id.
routerCarritos.post('/:id/productos/:id_prod', authentication,controllerCarritos.postProdutoByIdCarritosApi)

//POST :id/venta -> recibe el carrito en el body y procede a la venta del mismo (lo procesa).
routerCarritos.post('/:id/venta', authentication,controllerCarritos.postProcesaByIdCarritosApi)

//GET /:email/usuario -> devuelve los carritos según su email.
routerCarritos.get('/:email/usuario', authentication,controllerCarritos.getByEmailCarritosApi)

/*-----------------------------------------------------------*/

export default routerCarritos