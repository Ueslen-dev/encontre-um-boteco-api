import { Request, Response, NextFunction } from 'express'

import emailTransporter from '@config/email/emailTransporter'
import templateCodeVerification from '@config/email/template/templateCodeVerification'

class EmailController {
  async send (req: Request, res: Response, next:NextFunction) {
    try {
      const code = '545445'
      const emailBody = {
        from: 'c247f94b82945d',
        to: 'ueslencriacao@gmail.com',
        subject: 'Verificação de proprietário',
        html: templateCodeVerification(code)
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
