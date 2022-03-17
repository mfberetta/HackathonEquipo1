import ContenedorArchivo from "../../contenedores/contenedorArchivo.js"

class OrdenesDaoArchivo extends ContenedorArchivo {

    constructor(rutaDir) {
        super(`${rutaDir}/ordenes.json`)
    }
}

export default OrdenesDaoArchivo
