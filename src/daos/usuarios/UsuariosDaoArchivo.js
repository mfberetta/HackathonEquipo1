import ContenedorArchivo from "../../contenedores/contenedorArchivo.js"

class UsuariosDaoArchivo extends ContenedorArchivo {

    constructor(rutaDir) {
        super(`${rutaDir}/usuarios.json`)
    }
}

export default UsuariosDaoArchivo
