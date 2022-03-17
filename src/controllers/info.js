import obtenerInfo from '../servicios/info.js'

async function getInfoController(req, res,next) {
    try{
        const data = obtenerInfo()        
        //console.log(data)
        return res.render('info.ejs', { data: data })
    }
    catch(error){
        next(error)
    }
}

export { getInfoController }