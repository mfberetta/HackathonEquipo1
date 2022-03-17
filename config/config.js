import dotenv from 'dotenv'
dotenv.config()

let administrador

const mongo_user = process.env.MONGO_USER
const mongo_password = process.env.MONGO_PASSWORD
const mongo_server = process.env.MONGO_SERVER
const mongo_base = process.env.MONGO_BASE

export default {
    fileSystem: {
        path: './DB'
    },
    mongodb: {
        cnxStr: 'mongodb+srv://' + mongo_user + ':' + mongo_password + '@' + mongo_server + '/' + mongo_base,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    admin: {
        username: 'admin@e.commerse',
        password: '4dm1n'
    },
    setUserRol: (rol) => {
        if(rol == 'admin') administrador = true
        else administrador = false
    },
    getUserRol: () => {
        return administrador
    }
}

