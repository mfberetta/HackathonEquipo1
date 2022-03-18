import controllerSoft from '../controllers/soft.js'
import { authentication } from '../../utils/jwt.js'

import express from 'express'
const { Router } = express
const routerSoft = new Router()
routerSoft.use(express.json())
routerSoft.use(express.urlencoded({ extended: true }))

routerSoft.use((err, req, res, next) => {
    logger.error(err)
    res.status(500).json({ error: 'Algo salio mal...' })
});
/*-----------------------------------------------------------*/
// routes
//GET
routerSoft.get('/', authentication, controllerSoft.getByEmailSoftApi)

//POST
routerSoft.post('/', authentication, controllerSoft.postSoftApi)

//DELETE 
routerSoft.delete('/:query', authentication, controllerSoft.deleteByIdSoftApi)

//PUT 
routerSoft.put('/:query', authentication, controllerSoft.putByIdSoftApi)



export default routerSoft