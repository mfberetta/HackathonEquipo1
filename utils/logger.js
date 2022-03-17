//Libreria para logs
import log4js from 'log4js'
import dotenv from 'dotenv'
dotenv.config()

if(process.env.NODE_ENV == "desarrollo"){
  log4js.configure({ //desarrollo
    appenders: {
      consola: { type: 'console' },
      archivoError: { type: 'file', filename: './logs/error.log' },
      archivoWarn: { type: 'file', filename: './logs/warn.log' },
      loggerConsola: { type: 'logLevelFilter', appender: 'consola', level: 'info' },
      loggerError: { type: 'logLevelFilter', appender: 'archivoError', level: 'error' },
      loggerWarn: { type: 'logLevelFilter', appender: 'archivoWarn', level: 'warn' }
    },
    categories: {
      default:{
        appenders: ['consola', 'loggerWarn', 'loggerError'], level: "all" 
      }
    }
  })
}else{
  log4js.configure({ //produccion
    appenders: {
      archivoError: { type: 'file', filename: './logs/error.log' },
      archivoWarn: { type: 'file', filename: './logs/warn.log' },
      loggerError: { type: 'logLevelFilter', appender: 'archivoError', level: 'error' },
      loggerWarn: { type: 'logLevelFilter', appender: 'archivoWarn', level: 'warn' }
    },
    categories: {
      default:{
        appenders: ['loggerWarn', 'loggerError'], level: "all" 
      }
    }
  })
}
  
const logger = log4js.getLogger();
    
export default logger