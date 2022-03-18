import controllerTraining from '../controllers/training.js'
import { authentication } from '../../utils/jwt.js'

/*-----------------------------------------------------------*/
import express from 'express'
const { Router } = express
const routerTraining = new Router()
routerTraining.use(express.json())
routerTraining.use(express.urlencoded({ extended: true }));
/*-----------------------------------------------------------*/
//Handler
routerTraining.use((err, req, res, next) => {
    logger.error(err)
    res.status(500).json({ error: 'Algo salio mal...' })
});
/*-----------------------------------------------------------*/
// Routes
//GET
routerTraining.get('/', authentication, controllerTraining.getByEmailCoursesApi)

/*-----------------------------------------------------------*/

export default routerTraining