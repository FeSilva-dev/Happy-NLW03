import { Router } from 'express'
import orphanagesController from './controllers/orphanagesController'
import multer from 'multer'
import uploadConfig from './config/upload'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/orphanages', orphanagesController.index)
routes.get('/orphanages/:id', orphanagesController.show)
routes.post('/orphanages', upload.array('images') ,orphanagesController.create)

export default routes