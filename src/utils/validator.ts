import Pub from '@models/Pub'

import MESSAGES from '@utils/messages'
const {
  PUB_EXIST,
  PUB_CODE_EXIST,
  PUB_IMAGE_EXIST,
  PUB_WHATSAPP_EXIST,
  PUB_INSTAGRAM_EXIST
} = MESSAGES

export const isExistingProperty = async (
  name: String,
  code: String,
  filename: String,
  state: Number,
  city: Number,
  whatsapp: String,
  instagram: String
) => {
  console.log(await Pub.findOne({ name, state, city }), 'validando findOne')
  if (await Pub.findOne({ name, state, city })) return PUB_EXIST
  if (await Pub.findOne({ whatsapp })) return PUB_WHATSAPP_EXIST
  if (await Pub.findOne({ instagram })) return PUB_INSTAGRAM_EXIST
  if (await Pub.findOne({ code })) return PUB_CODE_EXIST
  if (filename) {
    if (await Pub.findOne({ photo: filename })) return PUB_IMAGE_EXIST
  }
}
