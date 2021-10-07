import { Request, Response, NextFunction } from 'express'

class PubController {
  async index (req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).send({ msg: 'Botecos' })
    } catch (error) {
      next(error)
    }
  }
}

export default PubController
