import express from 'express'
import cors from 'cors'
import route from './routes'
import 'dotenv/config'

const app = express()

app.use(cors())
app.use(express.json())
app.use(route)

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({ error: error.message })
})

const port = process.env.PORT || 5050

app.listen(port)
