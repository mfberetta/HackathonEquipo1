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
    getAll: async() => { //Devuelve todos los productos
        const soft = await softDao.getAll()
        return soft
    },

    getById: async(id) => { //Devuelve producto por id
        const soft = await softDao.getById(id)
        if(soft) return soft
        else return null
    },

    save: async (softNew) => { //Agrega producto
        //verifica campos
        if(!softNew.codigo) return null
        if(!softNew.nombre) return null
        if(!softNew.descripcion) return null
        if(!softNew.categoria) return null
        // if(!verificaLink(softNew.foto)) return null
        // if(!verificaPrecio(softNew.precio))  return null
        // if(!verificaStock(softNew.stock)) return null
        
        softNew = Object.assign({timestamp: Date.now()}, softNew)
        const id = await softDao.save(softNew)
        return id
    },

    deleteByIdSoft: async (id)=>{ //Elimina producto por id
        const soft = await softDao.getById(id)
        if(soft){
            const operacion = await softDao.deleteById(id)
            return true
        } 
        else return null
    },

    update: async (id,softMod)=>{ //Actualiza productos por id
        if(!softMod.id) softMod = Object.assign({id: id}, softMod)

        //verifica campos
        if(!softMod.id) return null
        if(!softMod.codigo) return null
        if(!softMod.timestamp) return null
        if(!softMod.nombre) return null
        if(!softMod.descripcion) return null
        if(!softMod.categoria) return null
        // if(!verificaLink(productoMod.foto)) return null
        // if(!verificaPrecio(productoMod.precio))  return null
        // if(!verificaStock(productoMod.stock)) return null
        
        const soft = await softDao.getById(id)
        if(soft){
            const operacion = await softDao.update(softMod)
            return true
        }
        else return null    
    }
}