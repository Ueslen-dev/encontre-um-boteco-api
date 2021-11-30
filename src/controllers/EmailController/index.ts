import { Request, Response, NextFunction } from 'express'
import path from 'path'
import hbs from 'nodemailer-express-handlebars'

import emailTransporter from '@config/emailTransporter'

import MESSAGES from '@utils/messages'
const {
  EMAIL_ERROR_TO,
  EMAIL_ERROR_SUBJECT
} = MESSAGES
class EmailController {
  async send (req: Request, res: Response, next: NextFunction) {
    const { to, subject } = req.query

    try {
      !to && res.status(400).json({ error: EMAIL_ERROR_TO })
      !subject && res.status(400).json({ error: EMAIL_ERROR_SUBJECT })

      const handlebarOptions = {
        viewEngine: {
          extName: '.handlebars',
          partialsDir: path.resolve(__dirname, '..', '..', 'templates'),
          defaultLayout: false
        },
        viewPath: path.resolve(__dirname, '..', '..', 'templates'),
        extName: '.handlebars'
      }

      emailTransporter.use('compile', hbs(handlebarOptions))

      const emailBody = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        template: 'index',
        context: {
          code: '545745'
        }
      }

      return emailTransporter.sendMail(emailBody).then(info => {
        res.send(info)
      }).catch(error => {
        res.send(error)
      })
    } catch (error) {
      next(error)
    }
  }
}

export default EmailController
