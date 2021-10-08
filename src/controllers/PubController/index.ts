import { Request, Response, NextFunction } from 'express'
import escapeStringRegexp from '@utils/escapeStringRegexp'
import { uid } from 'uid'
import Pub from '@models/Pub'
import PubInterface from '@interfaces/Pub'

class PubController {
  index (req: Request, res: Response, next: NextFunction) {
    try {
      const { state, city } = req.query as unknown as {state: Number, city: Number}

      state && city
        ? Pub.find({ state, city }, (err, data: PubInterface[]) => {
          if (err) {
            throw err
          }
          return res.status(200).json(data)
        })
        : res.status(400).json({ error: 'Não temos resultados' })
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
        photo,
        responsible
      }: PubInterface = req.body

      const code = uid(16)
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
        photo,
        responsible,
        code
      }))

      if (await Pub.findOne({ name })) { return res.status(400).json({ error: 'Infelizmente esse boteco já existe' }) }
      if (await Pub.findOne({ code })) return res.status(400).json({ error: 'Já existe um boteco com esse código' })
      if (await Pub.findOne({ photo })) return res.status(400).json({ error: 'Já existe um boteco com o mesmo nome de imagem' })

      insertPub.save()

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
        : res.status(400).json({ error: 'Não temos resultados' })
    } catch (error) {
      next(error)
    }
  }
}

export default PubController
