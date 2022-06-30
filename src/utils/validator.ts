import Pub from '@models/Pub'

import MESSAGES from '@utils/messages'
const {
  PUB_EXIST,
  PUB_CODE_EXIST,
  PUB_IMAGE_EXIST
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
  if (await Pub.findOne({ name, state, city })) return PUB_EXIST
  if (await Pub.findOne({ code })) return PUB_CODE_EXIST
  if (filename) {
    if (await Pub.findOne({ photo: filename })) return PUB_IMAGE_EXIST
  }
}
