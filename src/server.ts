import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import path from 'path'

import route from './routes'
import connectDB from '@config/database'

const app = express()
const port = process.env.PORT || 5050

app.use(cors())
app.use(express.json())
app.use(route)
app.use('/files', express.static(path.resolve(__dirname, '..', 'public', 'uploads')))

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500)
  res.json({ error: error.message })
})

connectDB()
app.listen(port)
