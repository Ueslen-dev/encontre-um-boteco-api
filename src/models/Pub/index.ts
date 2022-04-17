import { Schema, model } from 'mongoose'

const PubSchema = new Schema({
  name: { type: String, required: true, maxlength: 60 },
  email: { type: String, required: true, maxlength: 255 },
  whatsapp: { type: String, maxlength: 15, unique: true },
  instagram: { type: String, maxlength: 60, unique: true },
  state: { type: Number, required: true },
  city: { type: Number, required: true },
  cep: { type: Number },
  address: { type: String, maxlength: 255, required: true },
  reference: { type: String, maxlength: 255 },
  photo: { type: String, maxlength: 255, unique: true, required: true },
  responsible: { type: String, maxlength: 20, required: true },
  code: { type: String, maxlength: 16, required: true, unique: true }
})

const Pub = model('pubs', PubSchema)

export default Pub
