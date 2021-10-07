import { ConnectOptions, connect, connection } from 'mongoose'

type ConnectionOptionsExtend = {
  useNewUrlParser: boolean
  useUnifiedTopology: boolean
  useCreateIndex: boolean
}

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fbwc9.gcp.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`
const options: ConnectOptions & ConnectionOptionsExtend = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

const connectDB = async () => {
  await connect(
    mongoURI, options
  )
  console.log('conectou')

  connection.on('error', (error) => {
    console.log(`Error: ${error}`)
  })
}

export default connectDB
