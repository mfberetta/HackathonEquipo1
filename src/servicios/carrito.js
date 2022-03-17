import { carritosDao } from '../daos/carritos/index.js'
import { productosDao } from '../daos/productos/index.js'
import { ordenesDao } from '../daos/ordenes/index.js'
import dotenv from 'dotenv'
dotenv.config()

const MAIL_NOTIFICACIONES = process.env.MAIL_NOTIFICACIONES

export default {
    getAll: async() => { //Devuelve todos los carritos
        const carritos = await carritosDao.getAll()
        return carritos
    },

    getById: async(id) => { //Devuelve carrito por id
        const carrito = await carritosDao.getById(id)
        if(carrito) return carrito //devuelve el carrito
        else return null
    },

    getProductos: async(id) => { //devuelve los productos del carrito
        const carrito = await carritosDao.getById(id)
        if(carrito) return (carrito.productos) //devuelve el contenido de la clave producto
        else return null
    },  

    save: async(body) => { //creo carrito
        //verifica direccion
        if(!body.direccion) return null 
        //verifica mail si no se cumple la expresion regular no es mail (retorna null)
        if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(body.email)){
            return null
        }
        let objeto = {productos: []} //creo la clave productos en la estructura del carrito
        const fyh= new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
        objeto = Object.assign({fyh: fyh}, objeto)
        objeto = Object.assign({direccion: body.direccion},objeto)
        objeto = Object.assign({email: body.email}, objeto)
        const id = await carritosDao.save(objeto)
        return id
    },

    deleteByIdCarrito: async(id)=>{ //Elimina carrito
        const carrito = await carritosDao.getById(id)
        //Si lo encuentra lo elimina
        if(carrito){
            //en esta instancia como no actualiza stock no realizo operaciones
            // y vacio el carrito con carrito.productos = []
            carrito.productos = [] // vacio carrito
            const operacionVaciado = await carritosDao.update(carrito) //actualizo el carrito en el contenedor
            const operacionEliminacion = await carritosDao.deleteById(id)
            return true
        } 
        else return null
    },

    deleteByIdProductosByIdCarritos: async(id, idProd)=>{ //Elimina producto del carrito
        let carrito = await carritosDao.getById(id) //obtengo el carrito
        if(carrito){
            const prodCarritos = carrito.productos
            const pos = prodCarritos.findIndex(elemento => elemento.id == idProd) //Verifico si el producto ya está en el carrito
            if(pos>=0){ //existe
                carrito.productos[pos].cantidad -= 1 //decremento en 1 la cantidad del producto
                if(carrito.productos[pos].cantidad==0){ //cant = 0 se elimina el producto
                    carrito.productos.splice(pos, 1); //elimino el producto del array
                }
                const operacion = carritosDao.update(carrito) //actualizo el carrito
                if (operacion) return true
                else return null //falló la actualización del carritoreturn true     
            }
            else{ //No existe
                return null //no existe el producto
            }
        }
        else return null //no existe el carrito
    },

    addProdutoByIdCarritos: async(id,idProd)=>{ //Agrega producto al carrito
        let carrito = await carritosDao.getById(id) //obtengo el carrito
        if(carrito){
            const prodCarritos = carrito.productos
            const pos = prodCarritos.findIndex(elemento => elemento.id == idProd) //Verifico si el producto ya está en el carrito
            if(pos>=0){ //existe
                carrito.productos[pos].cantidad += 1 //incremento en 1 la cantidad del producto
                const operacion = carritosDao.update(carrito) //actualizo el carrito
                if (operacion) return true
                else return null //falló la actualización del carritoreturn true     
            }
            else{ //No existe
                const verificaProd = productosDao.getById(idProd)
                if(verificaProd){
                    const producto = {
                        'id': idProd,
                        'cantidad': 1
                    }
                    carrito.productos.push(producto) //hago el push del producto en la clave producto del carrito
                    const operacion = carritosDao.update(carrito) //actualizo el carrito
                    if (operacion) return true
                    else return null //falló la actualización del carrito
                }
                else return null //no existe el producto
            }
        }
        else return null //no existe el carrito
    },
    
    ProcesaByIdCarritos: async (id)=>{ //compra carrito
        const carrito = await carritosDao.getById(id)
        if(carrito){
            if(!carrito.productos.length) return null //no hay productos... no se puede vender
            //Varialbles
            let orden = {items: []} //creo la orden con la clave items 
            let prod = []
            let producto = []
            let item = {}
            let total = 0

            //Confeccion de la orden
            const fyh= new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
            orden = Object.assign({fyh: fyh}, orden)
            orden = Object.assign({estado: 'generada'},orden)
            orden = Object.assign({email: carrito.email}, orden)

            //recorro los productos que tiene el carrito e inserto los item c/descripcion, precio, subtotal en la orden)
            for(producto of carrito.productos){
                prod = await productosDao.getById(producto.id)
                item = {
                    'id': producto.id,
                    'nombre': prod.nombre,
                    'cantidad': producto.cantidad,
                    'precioUnitario': prod.precio,
                    'subtotal': producto.cantidad * prod.precio
                }
                orden.items.push(item)
                total += producto.cantidad * prod.precio
            }

            let ordenEmail = orden
            //Adapta (covierte) la orden json a html para el envío del email
            ordenEmail= JSON.stringify( ordenEmail, null, '&nbsp;' ).split( '\n' ).join( '<br>' )
            const reemplazar = /[\[\]{},\"]/g
            ordenEmail = ordenEmail.replace(reemplazar, '')
            
            //Guarda la orden para obtener el id
            const idOrden = await ordenesDao.save(orden)
            
            carrito.productos=[] //Elimina los productos del carrito luego de la venta
            await carritosDao.update(carrito) //update del carrito

            return idOrden
        }
        else return null //no se encontro el carrito
    },

    getByEmail: async(email) => { //Devuelve carrito por email
        const carritos = await carritosDao.getByEmail({'email':email})
        if(carritos) return carritos
        else return null
    }
}
/*-----------------------------------------------------------*/