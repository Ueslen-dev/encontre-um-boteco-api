import multer from 'multer'
import path from 'path'
import cryptoJs from 'crypto-js'

export const Upload = {
  dest: path.resolve(__dirname, '..', 'uploads', 'images'),
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, '..', '..', 'public', 'uploads', 'images'))
    },
    filename: (req, file, callback) => {
      const fileName = `${new Date().getTime()}-${cryptoJs.MD5(
        file.originalname
      )}-${file.originalname}`
      callback(null, fileName)
    }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    const allowedMimes = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png']
    allowedMimes.includes(file.mimetype)
      ? callback(null, true)
      : callback(new Error('Invalid file type.'))
  }
}

export default Upload
