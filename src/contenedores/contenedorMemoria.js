import { v4 as uuidv4 } from 'uuid'

class ContenedorMemoria{
    constructor(){
        this.array = []
    }

    async save(object) {
        //Number - Recibe un objeto, lo guarda en memoria, devuelve el id asignado.
        try{
            const id = uuidv4() //gernera id random
            object = Object.assign({id: id}, object)
            this.array.push(object)
            return id
        }
        catch(err){
            console.log('error:', err)
        }
    }

    async create(object){ 
        //Recibe un objeto, lo inserta en el array sin id custom
        try{
            this.array.push(object)
            return null
        }
        catch(err){
            console.log('error:', err)
        }
    }

    async getById(number){
        //Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
        try{
            for(let i = 0; i < this.array.length; i++){
                if(this.array[i].id == number) return this.array[i]
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
            const result = this.array.filter(elemento => elemento.email === query.email)
            return result
        }
        catch(err){
            console.log('error:', err)
        }
    }

    async getAll(){ 
        //Object[] - Devuelve un array con los objetos presentes en el archivo.
        try{
            return this.array
        }
        catch(err){
            console.log('error:', err)
        }
    }

    async deleteById(number){
        //void - Elimina del archivo el objeto con el id buscado.
        try{
            let arrayNew = []
            for(let i = 0; i < this.array.length; i++){
                if(this.array[i].id != number) arrayNew.push(this.array[i])
            }
            this.array = arrayNew
        }
        catch(err){
            console.log('error:', err)
        }
    }

    async deleteAll(){
        //void - Elimina todos los objetos presentes en el archivo.
        try{
            this.array = []
        }
        catch(err){
            console.log('error:', err)
        }
    }

    async update(object){
        //void - Actualiza elemento según id.
        try{
            const elemento = object //Producto a actualizar
            let arrayNew = [] //Nuevo array de array
            for(let i = 0; i < this.array.length; i++){
                if(this.array[i].id != elemento.id) arrayNew.push(this.array[i]) //Si el id es distinto copio el elemento original
                else arrayNew.push(elemento) //Si el id es igual actualizo el elemento
            }
            this.array = arrayNew
        }
        catch(err){
            console.log('error:', err)
        }
    }
}

export default ContenedorMemoria