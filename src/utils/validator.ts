import Pub from '@models/Pub'

import MESSAGES from '@utils/messages'
const {
  PUB_EXIST,
  PUB_CODE_EXIST
} = MESSAGES

export const isExistingProperty = async (
  name: String,
  code: String,
  state: Number,
  city: Number
) => {
  if (await Pub.findOne({ name, state, city })) return PUB_EXIST
  if (await Pub.findOne({ code })) return PUB_CODE_EXIST
}
