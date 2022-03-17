import { productosDao } from '../daos/productos/index.js'

function verificaPrecio(input){
    const regex = /^[0-9]+(\.[0-9]+)?$/
    return (regex.test(input))
}

function verificaStock(input){
    const regex = /^[0-9]+$/
    return (regex.test(input))
}

function verificaLink(input){
    const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    return (regex.test(input))
}

export default {
    getAll: async() => { //Devuelve todos los productos
        const productos = await productosDao.getAll()
        return productos
    },

    getById: async(id) => { //Devuelve producto por id
        const producto = await productosDao.getById(id)
        if(producto) return producto
        else return null
    },

    save: async (productoNew) => { //Agrega producto
        //verifica campos
        if(!productoNew.codigo) return null
        if(!productoNew.nombre) return null
        if(!productoNew.descripcion) return null
        if(!productoNew.categoria) return null
        if(!verificaLink(productoNew.foto)) return null
        if(!verificaPrecio(productoNew.precio))  return null
        if(!verificaStock(productoNew.stock)) return null
        
        productoNew = Object.assign({timestamp: Date.now()}, productoNew)
        const id = await productosDao.save(productoNew)
        return id
    },

    deleteByIdProducto: async (id)=>{ //Elimina producto por id
        const producto = await productosDao.getById(id)
        if(producto){
            const operacion = await productosDao.deleteById(id)
            return true
        } 
        else return null
    },

    update: async (id,productoMod)=>{ //Actualiza productos por id
        if(!productoMod.id) productoMod = Object.assign({id: id}, productoMod)

        //verifica campos
        if(!productoMod.id) return null
        if(!productoMod.codigo) return null
        if(!productoMod.timestamp) return null
        if(!productoMod.nombre) return null
        if(!productoMod.descripcion) return null
        if(!productoMod.categoria) return null
        if(!verificaLink(productoMod.foto)) return null
        if(!verificaPrecio(productoMod.precio))  return null
        if(!verificaStock(productoMod.stock)) return null
        
        const producto = await productosDao.getById(id)
        if(producto){
            const operacion = await productosDao.update(productoMod)
            return true
        }
        else return null    
    }
}