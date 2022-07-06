import { Request, Response, NextFunction } from 'express'
import path from 'path'
import hbs from 'nodemailer-express-handlebars'

import emailTransporter from '@config/emailTransporter'

import MESSAGES from '@utils/messages'
import EmailBodyInterface from '@interfaces/EmailBody'

const {
  EMAIL_ERROR_TO,
  EMAIL_ERROR_SUBJECT,
  EMAIL_SUCCESS
} = MESSAGES
class EmailController {
  async send (req: Request, res: Response, next: NextFunction) {
    const {
      to,
      subject,
      code,
      owner,
      pub
    }: EmailBodyInterface = req.body

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
        from: 'encontreumboteco@gmail.com',
        to,
        subject,
        template: 'index',
        context: {
          code,
          owner: owner || 'pessoa',
          pub
        }
      }

      return emailTransporter.sendMail(emailBody).then(infos => {
        res.status(200).json({ emailInfos: infos, success: EMAIL_SUCCESS })
      }).catch(error => {
        res.send(error)
      })
    } catch (error) {
      next(error)
    }
  }
}

export default EmailController
