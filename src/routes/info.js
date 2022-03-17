/*-----------------------------------------------------------*/
import express from 'express'
const { Router } = express
const routerInfo = new Router()
routerInfo.use(express.json())
routerInfo.use(express.urlencoded({ extended: true }))
/*-----------------------------------------------------------*/
import { getInfoController} from '../controllers/info.js'
/*-----------------------------------------------------------*/
//Manejador de error a nivel router
routerInfo.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ error: 'Algo salio mal...' })
})
/*-----------------------------------------------------------*/
//Rutas
routerInfo.get('/', getInfoController) //vista de info
/*-----------------------------------------------------------*/
export default routerInfo