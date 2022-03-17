import ContenedorArchivo from "../../contenedores/contenedorArchivo.js"

class CarritosDaoArchivo extends ContenedorArchivo {

    constructor(rutaDir) {
        super(`${rutaDir}/carritos.json`)
    }
}

export default CarritosDaoArchivo
