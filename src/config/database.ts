import { ConnectOptions, connect, connection } from 'mongoose'

type ConnectionOptionsExtend = {
  useNewUrlParser: boolean
  useUnifiedTopology: boolean
}

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.plvsk.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`
const options: ConnectOptions & ConnectionOptionsExtend = {
  useNewUrlParser: true,
  useUnifiedTopology: true
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
