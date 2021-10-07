import { Request, Response, NextFunction } from 'express'
import Pub from '@models/Pub'
import PubInterface from '@interfaces/Pub'

class PubController {
  index (req: Request, res: Response, next: NextFunction) {
    try {
      Pub.find({}, (err, data: PubInterface[]) => {
        if (err) {
          throw err
        }
        return res.status(200).json(data)
      })
    } catch (error) {
      next(error)
    }
  }
}

export default PubController
