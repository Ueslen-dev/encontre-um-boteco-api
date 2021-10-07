import express from 'express'

import PubController from '@controllers/PubController'

const route = express.Router()

const Pub = new PubController()

route.get('/pub', Pub.index)

export default route
