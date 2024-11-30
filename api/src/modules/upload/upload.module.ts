import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { multerConfig } from '../../config/multer/multer.config'
import { UploadController } from './upload.controller'

@Module({
  imports: [MulterModule.register(multerConfig)],
  controllers: [UploadController],
})
export class UploadModule {}
