import { Schema, model } from 'mongoose'

const PubSchema = new Schema({
  name: { type: String, required: true, maxlength: 45 },
  email: { type: String, required: true, maxlength: 255 },
  whatsapp: { type: String, maxlength: 15 },
  instagram: { type: String, maxlength: 35 },
  state: { type: Number, required: true },
  city: { type: Number, required: true },
  cep: { type: Number },
  address: { type: String, maxlength: 45 },
  reference: { type: String, maxlength: 45 },
  photo: { type: String, maxlength: 255 },
  responsible: { type: String, maxlength: 20 },
  code: { type: String, maxlength: 16, required: true, unique: true }
})

const Pub = model('pubs', PubSchema)

export default Pub
