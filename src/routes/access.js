import controllerAccess from '../controllers/access.js'
import { authentication } from '../../utils/jwt.js'

/*-----------------------------------------------------------*/
import express from 'express'
const { Router } = express
const routerAccess = new Router()
routerAccess.use(express.json())
routerAccess.use(express.urlencoded({ extended: true }));
/*-----------------------------------------------------------*/
//Handler
routerAccess.use((err, req, res, next) => {
    logger.error(err)
    res.status(500).json({ error: 'Algo salio mal...' })
});

/*-----------------------------------------------------------*/
// Routes

//GET
routerAccess.get('/', authentication, controllerAccess.getAccessApi);

//POST
routerAccess.post('/', authentication, controllerAccess.postAccessApi);

/*-----------------------------------------------------------*/

export default routerAccess