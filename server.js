//Configuración general del servidor
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(cors())

/*-----------------------------------------------------------*/
//Router for API access
import routerAccess from './src/routes/access.js'
app.use('/api/access', routerAccess)
/*-----------------------------------------------------------*/
//Router for API training
import routerTraining from './src/routes/training.js'
app.use('/api/training', routerTraining)
/*-----------------------------------------------------------*/
//Router for API soft
import routerSoft from './src/routes/soft.js'
app.use('/api/soft', routerSoft)

/*-----------------------------------------------------------*/
//Router para el login /logout /Register
import routerLogin from './src/routes/login.js'
app.use('/', routerLogin)
/*-----------------------------------------------------------*/
//Manejador de error a nivel aplicacion
app.use((err, req, res, next) => {
    logger.error(err)
    res.status(500).json({ error: 'Algo salio mal...' })
})
/*-----------------------------------------------------------*/
//Manejador de rutas no implementadas (logeo)
import logger from './utils/logger.js'
app.use((req, res) => {
    if(!req.route){
        const { url, method } = req
        logger.warn(`Ruta ${method} ${url} no implementada`) //Logger rutas no implementadas
        res.status(404).json({ error: -2, descripcion: 'ruta ' + req.path + ' metodo ' + req.method + ' no implementada' })
    }
})
/*-----------------------------------------------------------*/
export default app

