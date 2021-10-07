class PubController {
  async index (req, res, next) {
    try {
      return res.status(200).send({ msg: 'Botecos' })
    } catch (error) {
      next(error)
    }
  }
}

export default PubController
