import Pub from '@models/Pub'

import MESSAGES from '@utils/messages'
const {
  PUB_EXIST,
  PUB_CODE_EXIST,
  PUB_IMAGE_EXIST
} = MESSAGES

export const isExistingProperty = async (name: String, code: String, filename: String) => {
  if (await Pub.findOne({ name })) return PUB_EXIST
  if (await Pub.findOne({ code })) return PUB_CODE_EXIST
  if (filename) {
    if (await Pub.findOne({ photo: filename })) return PUB_IMAGE_EXIST
  }
}
