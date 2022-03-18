import { accessDao } from '../daos/access/index.js'

export default {
    
    getByQuery: async(email) => { //Devuelve accesos
        const query = {'email': email}
        
        const access = await accessDao.getByQuery(query)
        if(access) return access
        else return null
    },

    save: async (accessNew) => { //Agrega producto
        const id = await accessDao.save(accessNew)
        return id
    }

    //,deleteByIdProducto: async (id)=>{ //Elimina producto por id
    //    const producto = await accessDao.getById(id)
    //    if(producto){
    //        const operacion = await accessDao.deleteById(id)
    //        return true
    //    } 
    //    else return null
    //},
//
    //update: async (id,productoMod)=>{ //Actualiza productos por id
    //    if(!productoMod.id) productoMod = Object.assign({id: id}, productoMod)
//
    //    //verifica campos
    //    if(!productoMod.id) return null
    //    if(!productoMod.codigo) return null
    //    if(!productoMod.timestamp) return null
    //    if(!productoMod.nombre) return null
    //    if(!productoMod.descripcion) return null
    //    if(!productoMod.categoria) return null
    //    if(!verificaLink(productoMod.foto)) return null
    //    if(!verificaPrecio(productoMod.precio))  return null
    //    if(!verificaStock(productoMod.stock)) return null
    //    
    //    const producto = await accessDao.getById(id)
    //    if(producto){
    //        const operacion = await accessDao.update(productoMod)
    //        return true
    //    }
    //    else return null    
    //}
}