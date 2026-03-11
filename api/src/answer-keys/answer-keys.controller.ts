import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import { AnswerKeysService } from './answer-keys.service'
import { CreateAnswerKeyDto } from './dto/create-answer-key.dto'
import { UpdateAnswerKeyDto } from './dto/update-answer-key.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiSecurity, ApiBearerAuth } from '@nestjs/swagger'
import { AnswerKey } from './entities/answer-key.entity'
import { AuthGuard } from 'src/guards/auth.guard'
import { Roles } from 'src/decorators/roles.decorator'
import { Role } from 'src/enums/roles.enum'

@ApiTags('Answer Keys')
@Controller('answer-keys')
@ApiBearerAuth()
@ApiSecurity('bearer')
@UseGuards(AuthGuard)
export class AnswerKeysController {
  constructor(private readonly answerKeysService: AnswerKeysService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Coordinator)
  @ApiOperation({
    summary: 'Create answer key',
    description: 'Creates a new answer key for a specific test question.',
  })
  @ApiBody({
    type: CreateAnswerKeyDto,
    description: 'Answer key creation data',
    examples: {
      answerKey: {
        value: {
          questionNumber: 1,
          correctOption: 'A',
          testDayId: 1,
          subjectId: 'COMP101',
        },
        description: 'Example of creating an answer key for question 1',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Answer key created successfully',
    type: AnswerKey,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input - Check question number, option, or test day ID',
  })
  @ApiResponse({
    status: 409,
    description: 'Answer key already exists for this question',
  })
  create(@Body() createAnswerKeyDto: CreateAnswerKeyDto) {
    return this.answerKeysService.create(createAnswerKeyDto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all answer keys',
    description: 'Retrieves all answer keys with their corresponding test days and subjects.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of answer keys retrieved successfully',
    type: [AnswerKey],
  })
  findAll() {
    return this.answerKeysService.findAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get answer key by ID',
    description: 'Retrieves a specific answer key by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Answer key unique identifier',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Answer key found',
    type: AnswerKey,
  })
  @ApiResponse({
    status: 404,
    description: 'Answer key not found',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.answerKeysService.findOne(id)
  }

  @Patch(':id')
  @Roles(Role.Coordinator)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update answer key',
    description: 'Updates an existing answer key information.',
  })
  @ApiParam({
    name: 'id',
    description: 'Answer key ID to update',
    type: Number,
    example: 1,
  })
  @ApiBody({
    type: UpdateAnswerKeyDto,
    description: 'Fields to update in the answer key',
    examples: {
      update: {
        value: {
          correctOption: 'B',
        },
        description: 'Example of updating the correct option',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Answer key updated successfully',
    type: AnswerKey,
  })
  @ApiResponse({
    status: 404,
    description: 'Answer key not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid update data provided',
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAnswerKeyDto: UpdateAnswerKeyDto) {
    return this.answerKeysService.update(id, updateAnswerKeyDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.Coordinator)
  @ApiOperation({
    summary: 'Delete answer key',
    description: 'Removes an answer key from the system.',
  })
  @ApiParam({
    name: 'id',
    description: 'Answer key ID to delete',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 204,
    description: 'Answer key successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Answer key not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Cannot delete answer key - Associated with student answers',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.answerKeysService.remove(id)
  }
}
