import { response } from 'express'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: '',
  port: '',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

transporter.senMail({
  from: process.env.EMAIL_USER,
  to: 'quemrecebe@gmail.com',
  replyTo: 'contato@gmail.com',
  subject: 'Verificação de proprietário',
  html: 'vem aqui'
}).then(info => {
  response.send(info)
}).catch(error => {
  response.send(error)
})
