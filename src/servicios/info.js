import os from 'os'
import fs from 'fs'

//Obtiene los argumentros
function obtenerInfo() {
    let env = fs.readFileSync('.env', 'utf8')
    env = env.replace(new RegExp('\r?\n','g'), ' | ');
    let argumentos =''
    process.argv.forEach(function (val, index, array) {
        if(index >= 2){
            argumentos = argumentos + val + ' '
        }
    });
    //Conforma json con los datos        
    const data = {
        "env": env, //- Archivo env
        "argumentos" : argumentos, //- Argumentos de entrada
        "path" : process.execPath, //- Path de ejecución
        "plataforma" : process.platform, //- Nombre de la plataforma (sistema operativo)
        "pid" : process.pid, //- Process id
        "version" : process.version, //- Versión de node.js
        "directorio" : process.cwd(), //- Carpeta del proyecto
        "memoria" : process.memoryUsage().rss, //- Memoria total reservada (rss)
        "procesadores" : os.cpus().length //- Cantidad de procesadores 
    }
    return data
}

export default obtenerInfo