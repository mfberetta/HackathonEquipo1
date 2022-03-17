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
//websocket de chat
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import servicioMensajes from './src/servicios/mensajes.js'
//Configuración del socket
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
io.on('connection', socket => {
    //console.log('Un cliente se ha conectado')
    //Recupero mensajes de todos los usuarios
    const msgs = servicioMensajes.getAll()
    .then((msgs) => {
        socket.emit('mensajes', msgs)
    }) 
    //Petición para recupero de los mensajes del usuario logueado
    socket.on('email',email => {
        const msgsUser = servicioMensajes.getMsgsUser(email)
        .then((msgsUser) => {
            socket.emit('mensajesUsuario', msgsUser)
        })  
    })
    //Nuevo mensaje
    socket.on('new-msg',data => {
        const id = servicioMensajes.save(data)
        .then((id) => {
            if(id){ //si el mensaje no estaba vacio
                //genera respuesta automatica del sistema
                const resp = servicioMensajes.response(data.email)
                .then((resp) => {
                    const msgs = servicioMensajes.getAll()
                    .then((msgs) => {
                        io.sockets.emit('mensajes', msgs)
                    })
                })
            }
        })    
    })
 })
/*-----------------------------------------------------------*/
//Router para la API de ordenes
import routerOrdenes from './src/routes/ordenes.js'
app.use('/api/ordenes', routerOrdenes)
//Router para el front de ordenes
import routerFrontOrdenes from './src/routes/ordenesFront.js'
app.use('/ordenes', routerFrontOrdenes)
/*-----------------------------------------------------------*/
//Router para la API de productos
import routerProductos from './src/routes/productos.js'
app.use('/api/productos', routerProductos)
//Router para el front de productos
import routerFrontProductos from './src/routes/productosFront.js'
app.use('/productos', routerFrontProductos)
/*-----------------------------------------------------------*/
//Router para la API de carritos
import routerCarritos from './src/routes/carritos.js'
app.use('/api/carritos', routerCarritos)
//Router para el front de carritos
import routerFrontCarritos from './src/routes/carritosFront.js'
app.use('/carrito', routerFrontCarritos)
/*-----------------------------------------------------------*/
//Router para el login /logout /Register
import routerLogin from './src/routes/login.js'
app.use('/', routerLogin)
/*-----------------------------------------------------------*/
//Router para ver la info del servidor
import routerInfo from './src/routes/info.js'
app.use('/info', routerInfo)
/*-----------------------------------------------------------*/
//Router para mensajes
import routerMensajes from './src/routes/mensajes.js'
app.use('/chat', routerMensajes)
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

export default httpServer

