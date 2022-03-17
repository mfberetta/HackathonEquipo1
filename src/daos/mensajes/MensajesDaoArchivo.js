import ContenedorArchivo from "../../contenedores/contenedorArchivo.js"

class MensajesDaoArchivo extends ContenedorArchivo {

    constructor(rutaDir) {
        super(`${rutaDir}/mensajes.json`)
    }
}

export default MensajesDaoArchivo
