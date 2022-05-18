import { Request, Response, NextFunction } from 'express'

import Pub from '@models/Pub'
import PubInterface from '@interfaces/Pub'

import MESSAGES from '@utils/messages'
const {
  NOT_ID_OR_CODE,
  NOT_PUB_OWNER,
  PUB_OWNER_EXIST
} = MESSAGES

class CodeController {
  async validate (req: Request, res: Response, next: NextFunction) {
    try {
      const { id, code } = req.query as unknown as { id: String, code: String}

      if (!id || !code) return res.status(400).json({ error: NOT_ID_OR_CODE })

      const findCode: PubInterface = await Pub.findOne({ _id: id, code })

      if (!findCode) return res.status(404).json({ error: NOT_PUB_OWNER })

      return res.status(200).json({ pub: findCode, success: PUB_OWNER_EXIST })
    } catch (error) {
      next(error)
    }
  }
}

export default CodeController
