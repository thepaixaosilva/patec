import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, NotFoundException, StreamableFile } from '@nestjs/common'
import { TestDaysService } from './test-days.service'
import { CreateTestDayDto } from './dto/create-test-day.dto'
import { UpdateTestDayDto } from './dto/update-test-day.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger'
import { TestDay } from './entities/test-day.entity'
// import { TestType } from './enums/test-type.enum'
import { AuthGuard } from 'src/guards/auth.guard'
import { Roles } from 'src/decorators/roles.decorator'
import { Role } from 'src/enums/roles.enum'
import { UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import * as path from 'path'
import { Response } from 'express'
import * as fs from 'fs'
import { Public } from 'src/decorators/public.decorator'

@ApiTags('Test days')
@Controller('test-days')
@ApiBearerAuth()
@ApiSecurity('bearer')
@UseGuards(AuthGuard)
export class TestDaysController {
  constructor(private readonly testDaysService: TestDaysService) {}

  @Post()
  @Roles(Role.Coordinator)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './dist/uploads/test-days', // Salva os arquivos no diretório dist/uploads/test-days
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
          const ext = path.extname(file.originalname)
          const filename = `${path.basename(file.originalname, ext)}-${uniqueSuffix}${ext}`
          cb(null, filename)
        },
      }),
    })
  )
  create(@Body() createTestDayDto: CreateTestDayDto, @UploadedFile() file: Express.Multer.File) {
    createTestDayDto.testDate = new Date(createTestDayDto.testDate)
    createTestDayDto.filePath = file?.path.split('/')[3]
    return this.testDaysService.create(createTestDayDto)
  }

  @Get()
  @ApiOperation({
    summary: 'Get all test days',
    description: 'Retrieves a list of all test days with their associated answer keys.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all test days retrieved successfully.',
    type: [TestDay],
  })
  findAll() {
    return this.testDaysService.findAll()
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a test day by ID',
    description: 'Retrieves a specific test day and its associated answer keys by ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Test day ID',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The test day has been found.',
    type: TestDay,
  })
  @ApiResponse({
    status: 404,
    description: 'Test day not found.',
  })
  findOne(@Param('id') id: string) {
    return this.testDaysService.findOne(+id)
  }

  @Get('pdf/:filename')
  @Public()
  getPdf(@Param('filename') filename: string, @Res() res: Response) {
    // Definindo o caminho para o arquivo PDF
    const filePath = path.join(__dirname, '.', 'uploads', 'test-days', filename)

    // Verificando se o arquivo existe
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Arquivo não encontrado')
    }

    // Enviar o arquivo como um stream
    const file = fs.createReadStream(filePath)
    res.set({
      'Content-Type': 'application/pdf', // Tipo de conteúdo (assumindo que o arquivo é PDF)
      'Content-Disposition': `inline; filename="${filename}"`, // Disposição do arquivo (inline para abrir no navegador)
    })

    // Usando o método sendFile ou StreamableFile
    return new StreamableFile(file)
  }

  @Patch(':id')
  @Roles(Role.Coordinator)
  @ApiOperation({
    summary: 'Update a test day',
    description: "Updates a test day's information by its ID.",
  })
  @ApiParam({
    name: 'id',
    description: 'Test day ID to update',
    type: Number,
    example: 1,
  })
  @ApiBody({
    type: UpdateTestDayDto,
    description: 'Updated test day data',
    examples: {
      update: {
        value: {
          testDate: new Date(),
          testType: 'FINAL',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The test day has been successfully updated.',
    type: TestDay,
  })
  @ApiResponse({
    status: 404,
    description: 'Test day not found.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid date format or test type.',
  })
  update(@Param('id') id: string, @Body() updateTestDayDto: UpdateTestDayDto) {
    return this.testDaysService.update(+id, updateTestDayDto)
  }

  @Delete(':id')
  @Roles(Role.Coordinator)
  @ApiOperation({
    summary: 'Delete a test day',
    description: 'Removes a test day and its associated answer keys from the system.',
  })
  @ApiParam({
    name: 'id',
    description: 'Test day ID to delete',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The test day has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Test day not found.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - Cannot delete test day with existing answer keys.',
  })
  remove(@Param('id') id: string) {
    return this.testDaysService.remove(+id)
  }
}
