import { diskStorage } from 'multer'
import { extname } from 'path'
import { existsSync, mkdirSync } from 'fs'

const uploadFolder = process.env.NODE_ENV === 'production' ? '/tmp/uploads' : './uploads'

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      if (!existsSync(uploadFolder)) {
        mkdirSync(uploadFolder, { recursive: true })
      }
      cb(null, uploadFolder)
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
      cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`)
    },
  }),
  fileFilter: (req, file, cb) => {
    // Validação específica para PDFs
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Apenas arquivos PDF são permitidos.'), false)
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB - aumentado para PDFs
  },
}
