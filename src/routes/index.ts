import express from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'

import PubController from '@controllers/PubController'
import Emailcontroller from '@controllers/EmailController'

const route = express.Router()

const Pub = new PubController()
const Email = new Emailcontroller()

route.get('/pub', Pub.index)
route.get('/pub/search', Pub.search)
route.post('/pub', Pub.save)
route.post('/pub/upload', multer(uploadConfig).single('file'), Pub.upload)

route.get('/pub/email/send', Email.send)
route.get('/pub/user/validate', Pub.validateUser)

export default route
