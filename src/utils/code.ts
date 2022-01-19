import Pub from '@models/Pub'

export const codeValidate = async (id: String, code: String) => {
  if (id && code) {
    const currentCode = await Pub.findOne({ _id: id, code })

    return currentCode
  }
}

export const refreshCode = (userId: String) => {

}
