import { Request, Response, NextFunction } from 'express'
import escapeStringRegexp from '@utils/escapeStringRegexp'
import { uid } from 'uid'
import Pub from '@models/Pub'
import PubInterface from '@interfaces/Pub'
import { isExistingProperty } from '@utils/validator'

import MESSAGES from '@utils/messages'
const {
  NOT_RESULT,
  UPLOAD_SUCCESS,
  UPLOAD_ERROR,
  NOT_DELETE,
  PUB_IMAGE_NOT_EXIST,
  PUB_CREATED,
  DELETE_SUCCESS
} = MESSAGES

const maxLengthUid = 16
let filename
class PubController {
  index (req: Request, res: Response, next: NextFunction) {
    try {
      const { state, city, page, limit } = req.query as unknown as {
        state: Number,
        city: Number,
        page: Number,
        limit: Number,
      }

      const pageNumber = (Math.abs(Number(page)) || 1) - 1

      if (state && city) {
        Pub.find({ state: Number(state), city: Number(city) })
          .sort({ name: 'asc' })
          .skip(Number(limit) * pageNumber)
          .limit(Number(limit))

          .exec((err, pubs) => {
            if (err) {
              throw err
            }
            Pub.countDocuments({ state: Number(state), city: Number(city) }).exec((err, count) => {
              if (err) {
                throw err
              }

              return res.status(200).json({
                results: pubs,
                page: pageNumber,
                totalResults: pubs.length,
                totalPages: Math.ceil(count / Number(limit))
              })
            })
          })
      }
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

      const validator = await isExistingProperty(
        name,
        code,
        filename,
        state,
        city,
        whatsapp,
        instagram
      )

      if (validator) return res.status(400).json({ error: validator })
      if (!filename) return res.status(400).json({ error: PUB_IMAGE_NOT_EXIST })

      insertPub.save()
      filename = undefined

      return res.send({ insertPub, success: PUB_CREATED })
    } catch (error) {
      next(error)
    }
  }

  async search (req: Request, res: Response, next: NextFunction) {
    try {
      const { state, city, search } = req.query as unknown as {
        state: Number,
        city: Number,
        search: String,
      }
      const searchRegex = escapeStringRegexp(search)

      searchRegex
        ? Pub.find({
          name: { $regex: new RegExp(searchRegex, 'ig') },
          state: Number(state),
          city: Number(city)
        }, (err, data: PubInterface[]) => {
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

  async update (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.query as unknown as { id: String}
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

      const validator = await isExistingProperty(
        name,
        code,
        filename,
        state,
        city,
        whatsapp,
        instagram
      )

      if (validator) return res.status(400).json({ error: validator })

      const pubUpdate = await Pub.findOneAndUpdate({ _id: id }, {
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
      }, {
        new: true
      })
      filename = undefined

      return res.status(200).json(pubUpdate)
    } catch (error) {
      next(error)
    }
  }

  async delete (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.query as unknown as { id: String}

      if (!id) return res.status(400).json({ error: NOT_DELETE })

      const pubDelete = await Pub.findOneAndDelete({ _id: id })

      return res.status(200).json({ pub: pubDelete, success: DELETE_SUCCESS })
    } catch (error) {
      next(error)
    }
  }

  async upload (req: Request, res: Response, next: NextFunction) {
    try {
      if (req.file.filename) {
        filename = req.file.filename
        return res.status(200).json({ success: UPLOAD_SUCCESS })
      } else {
        return res.status(400).json({ error: UPLOAD_ERROR })
      }
    } catch (error) {
      next(error)
    }
  }
}

export default PubController
