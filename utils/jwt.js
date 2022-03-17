import jwt from  'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const EXPIRACION = process.env.TIEMPO_SESION
const PRIVATE_KEY = 'notelovoyadecir'

export const generateAuthToken = (nombre) => {
  const token = jwt.sign({ nombre: nombre }, PRIVATE_KEY, { expiresIn: EXPIRACION });
  return token;
}

export const authentication = (req, res, next) => {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"] || '';
  if (!authHeader) {
    return res.status(401).json({
      error: 'se requiere autenticacion para acceder a este recurso',
      detalle: 'no se encontró token de autenticación'
    })
  }
  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      error: 'se requiere autenticacion para acceder a este recurso',
      detalle: 'formato de token invalido!'
    })
  }
  try {
    req.user = jwt.verify(token, PRIVATE_KEY);
  } catch (ex) {
    return res.status(403).json({
      error: 'token invalido',
      detalle: 'nivel de acceso insuficiente para el recurso solicitado'
    })
  }
  next();
}
