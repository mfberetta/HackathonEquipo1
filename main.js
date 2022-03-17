//puesta en escucha del servidor
import httpServer from './server.js' //importa servidor
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on("error", error => console.log(`Error en servidor: ${error}`))

