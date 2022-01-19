import { Request, Response, NextFunction } from 'express'

import Pub from '@models/Pub'
import PubInterface from '@interfaces/Pub'

import MESSAGES from '@utils/messages'
const {
  NOT_USER_VALIDATE,
  NOT_PUB_OWNER
} = MESSAGES

class UserController {
  async validate (req: Request, res: Response, next: NextFunction) {
    try {
      const { id, email } = req.query as unknown as { id: String, email: String}

      if (!id || !email) { return res.status(400).json({ error: NOT_USER_VALIDATE }) }

      const findPub: PubInterface = await Pub.findOne({ _id: id, email })

      if (!findPub) { return res.status(400).json({ error: NOT_PUB_OWNER }) }

      return res.status(200).json(findPub)
    } catch (error) {
      next(error)
    }
  }
}

export default UserController
