import { Request, Response, NextFunction } from 'express'
import escapeStringRegexp from '@utils/escapeStringRegexp'
import { uid } from 'uid'
import Pub from '@models/Pub'
import PubInterface from '@interfaces/Pub'

import MESSAGES from '@utils/messages'
const {
  NOT_RESULT,
  PUB_EXIST,
  PUB_CODE_EXIST,
  PUB_IMAGE_EXIST,
  UPLOAD_SUCCESS,
  UPLOAD_ERROR
} = MESSAGES

const maxLengthUid = 16
let filename
class PubController {
  index (req: Request, res: Response, next: NextFunction) {
    try {
      const { state, city } = req.query as unknown as { state: Number, city: Number }

      state && city
        ? Pub.find({ state, city }, (err, data: PubInterface[]) => {
          if (err) {
            throw err
          }
          return res.status(200).json(data)
        })
        : res.status(400).json({ error: NOT_RESULT })
    } catch (error) {
      next(error)
    }
  }

  async save (req: Request, res: Response, next: NextFunction) {
    try {
      const {
        name,
        email,
        whatsapp,
        instagram,
        state,
        city,
        cep,
        address,
        reference,
        responsible
      }: PubInterface = req.body

      const code = uid(maxLengthUid)
      const insertPub = new Pub(({
        name,
        email,
        whatsapp,
        instagram,
        state,
        city,
        cep,
        address,
        reference,
        photo: filename,
        responsible,
        code
      }))

      if (await Pub.findOne({ name })) { return res.status(400).json({ error: PUB_EXIST }) }
      if (await Pub.findOne({ code })) return res.status(400).json({ error: PUB_CODE_EXIST })
      if (await Pub.findOne({ photo: filename })) return res.status(400).json({ error: PUB_IMAGE_EXIST })

      insertPub.save()
      filename = undefined

      return res.send({ insertPub })
    } catch (error) {
      next(error)
    }
  }

  async search (req: Request, res: Response, next: NextFunction) {
    try {
      const search: string = req.query.search as string
      const $regex = escapeStringRegexp(search)

      $regex
        ? Pub.find({ name: { $regex } }, (err, data: PubInterface[]) => {
          if (err) {
            throw err
          }
          return res.status(200).json(data)
        })
        : res.status(400).json({ error: NOT_RESULT })
    } catch (error) {
      next(error)
    }
  }

  async upload (req: Request, res: Response, next: NextFunction) {
    try {
      if (req.file.filename) {
        filename = req.file.filename
        return res.status(201).json({ success: UPLOAD_SUCCESS })
      } else {
        return res.status(400).json({ error: UPLOAD_ERROR })
      }
    } catch (error) {
      next(error)
    }
  }
}

export default PubController
