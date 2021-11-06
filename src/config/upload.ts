import multer from 'multer'
import path from 'path'
import cryptoJs from 'crypto-js'

export const Upload = {
  dest: path.resolve(__dirname, '..', 'uploads', 'images'),
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, '..', 'uploads', 'images'))
    },
    filename: (req, file, callback) => {
      console.log(file)
      const fileName = `${new Date().getTime()}-${cryptoJs.MD5(
        file.originalname
      )}-${file.originalname}`
      callback(null, fileName)
    }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png', 'image/gif']
    allowedMimes.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error('Invalid file type.'))
  }
}

export default Upload
