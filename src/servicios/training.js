import { trainingDao } from '../daos/training/index.js'

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
    
    getByQuery: async(email) => { //Devuelve producto por id
        const courses = await trainingDao.getByQuery({'email': email} )
        if(courses) return courses
        else return null
    }

}