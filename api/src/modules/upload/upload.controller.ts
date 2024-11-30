import { Controller, Post, Get, Param, Res, UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { multerConfig } from '../../config/multer/multer.config'

@Controller('upload')
export class UploadController {
  @Post('pdf')
  @UseInterceptors(FileInterceptor('pdf', multerConfig))
  async uploadPdf(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('Arquivo não fornecido', HttpStatus.BAD_REQUEST)
    }

    const baseUrl = process.env.BASE_URL || 'http://localhost:3000'

    return {
      message: 'PDF enviado com sucesso',
      fileUrl: `${baseUrl}/upload/pdf/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
    }
  }

  @Get('pdf/:filename')
  async servePdf(@Param('filename') filename: string, @Res() res: Response) {
    const uploadFolder = process.env.NODE_ENV === 'production' ? '/tmp/uploads' : './uploads'
    res.setHeader('Content-Type', 'application/pdf')
    res.sendFile(filename, { root: uploadFolder })
  }
}
