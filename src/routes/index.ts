import express from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'

import PubController from '@controllers/PubController'
import Emailcontroller from '@controllers/EmailController'
import UserController from '@controllers/UserController'
import CodeController from '@controllers/CodeController'

const route = express.Router()

const Pub = new PubController()
const Email = new Emailcontroller()
const User = new UserController()
const Code = new CodeController()

route.get('/pub', Pub.index)
route.get('/pub/search', Pub.search)
route.post('/pub', Pub.save)
route.post('/pub/upload', multer(uploadConfig).single('file'), Pub.upload)
route.put('/pub', Pub.update)
route.delete('/pub', Pub.delete)

route.get('/pub/email/send', Email.send)
route.get('/pub/user/validate', User.validate)
route.get('/pub/code/validate', Code.validate)

export default route
