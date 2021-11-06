import express from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'

import PubController from '@controllers/PubController'

const route = express.Router()

const Pub = new PubController()

route.get('/pub', Pub.index)
route.get('/pub/search', Pub.search)
route.post('/pub', Pub.save)
route.post('/pub/upload', multer(uploadConfig).single('file'), Pub.upload)

export default route
