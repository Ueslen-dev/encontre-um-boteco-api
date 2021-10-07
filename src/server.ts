import express from 'express'

const app = express()

app.get('/', (request, response) => {
  return response.json({ hello: 'olá mundo' })
})

app.listen(5050)

export class test {
  teste () {
    const oi = 'asd'
  }
}
