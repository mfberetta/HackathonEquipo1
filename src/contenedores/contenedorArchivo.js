import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

class ContenedorArchivo{
    constructor(nombreArch){
        this.nombreArch = nombreArch
        //Se crea si no existe
        if(!fs.existsSync(this.nombreArch)){
            let array = []
            fs.writeFileSync(this.nombreArch, JSON.stringify(array,null,2))
        }
    }

    async save(object) {
        //Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        try{
            let array = []
            if(fs.existsSync(this.nombreArch)){
                const contenido = await fs.promises.readFile(this.nombreArch, 'utf8')
                array = JSON.parse(contenido)
            }
            const id = uuidv4() //gernera id random
            object = Object.assign({id: id}, object)
            array.push(object)
            await fs.promises.writeFile(this.nombreArch, JSON.stringify(array,null,2))
            return id
        }
        catch(err){
            console.log('error:', err)
        }
    }

    async create(object){ 
        //Recibe un objeto, lo inserta en el archivo sin id custom
        try{
            let array = []
            if(fs.existsSync(this.nombreArch)){
                const contenido = await fs.promises.readFile(this.nombreArch, 'utf8')
                array = JSON.parse(contenido)
            }
            array.push(object)
            await fs.promises.writeFile(this.nombreArch, JSON.stringify(array,null,2))
            return null
        }
        catch(err){
            console.log('error:', err)
        }
    }

    async getById(number){
        //Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
        try{
            let array = []
            const contenido = await fs.promises.readFile(this.nombreArch, 'utf8')
            array = JSON.parse(contenido)
            for(let i = 0; i < array.length; i++){
                if(array[i].id == number) return array[i]
            }
            return null
        }
        catch(err){
            console.log('error:', err)
        }
    }

    async getByEmail(query){ 
        //Devuelve según el email de la query.
        try{
            let array = []
            const contenido = await fs.promises.readFile(this.nombreArch, 'utf8')
            array = JSON.parse(contenido)
            const result = array.filter(elemento => elemento.email === query.email);
            return result
        }
        catch(err){
            console.log('error:', err)
        }
    }

    async getAll(){ 
        //Object[] - Devuelve un array con los objetos presentes en el archivo.
        try{
            let array = []
            const contenido = await fs.promises.readFile(this.nombreArch, 'utf8')
            array = JSON.parse(contenido)
            return array
        }
        catch(err){
            console.log('error:', err)
        }
    }

    async deleteById(number){
        //void - Elimina del archivo el objeto con el id buscado.
        try{
            let array = []
            let arrayNew = []
            const contenido = await fs.promises.readFile(this.nombreArch, 'utf8')
            array = JSON.parse(contenido)
            for(let i = 0; i < array.length; i++){
                if(array[i].id != number) arrayNew.push(array[i])
            }
            await fs.promises.writeFile(this.nombreArch, JSON.stringify(arrayNew,null,2))
        }
        catch(err){
            console.log('error:', err)
        }
    }

    async deleteAll(){
        //void - Elimina todos los objetos presentes en el archivo.
        const array = []
        try{
            fs.writeFileSync(this.nombreArch,JSON.stringify(array,null,2))
        }
        catch(err){
            console.log('error:', err)
        }
    }

    async update(object){
        //void - Actualiza elemento según id.
        try{
            const elemento = object //Producto a actualizar
            let array = [] //array actuales
            let arrayNew = [] //Nuevo array de array
            const contenido = await fs.promises.readFile(this.nombreArch, 'utf8')
            array = JSON.parse(contenido)
            for(let i = 0; i < array.length; i++){
                if(array[i].id != elemento.id) arrayNew.push(array[i]) //Si el id es distinto copio el elemento original
                else arrayNew.push(elemento) //Si el id es igual actualizo el elemento
            }
            await fs.promises.writeFile(this.nombreArch, JSON.stringify(arrayNew,null,2))
        }
        catch(err){
            console.log('error:', err)
        }
    }
}

export default ContenedorArchivo