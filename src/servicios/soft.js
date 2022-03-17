import { softDao } from '../daos/soft/index.js'

// function verificaPrecio(input){
//     const regex = /^[0-9]+(\.[0-9]+)?$/
//     return (regex.test(input))
// }

// function verificaStock(input){
//     const regex = /^[0-9]+$/
//     return (regex.test(input))
// }

// function verificaLink(input){
//     const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
//     return (regex.test(input))
// }

export default {

    getByQuery: async(query) => {
        const soft = await softDao.getByQuery({ query });
        if (soft) return soft
        else return null

    },
    getById: async(id) => { //Devuelve producto por id
        const soft = await softDao.getById(id)
        if (soft) return soft
        else return null
    },

    save: async(softNew) => { //Agrega producto
        const id = await softDao.save(softNew)
        return id
    },

    deleteByIdSoft: async(id) => { //Elimina producto por id
        const soft = await softDao.getById(id)
        if (soft) {
            const operacion = await softDao.deleteById(id)
            return true
        } else return null
    },

    update: async(id, softMod) => { //Actualiza productos por id
        if (!softMod.id) softMod = Object.assign({ id: id }, softMod)

        //verifica campos
        if (!softMod.id) return null
        if (!softMod.codigo) return null

        if (!softMod.nombre) return null
        if (!softMod.descripcion) return null
        if (!softMod.categoria) return null
            // if(!verificaLink(productoMod.foto)) return null
            // if(!verificaPrecio(productoMod.precio))  return null
            // if(!verificaStock(productoMod.stock)) return null

        const soft = await softDao.getById(id)
        if (soft) {
            const operacion = await softDao.update(softMod)
            return true
        } else return null
    }
}