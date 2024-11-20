import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import { StudentAnswersService } from './student-answers.service'
import { CreateStudentAnswerDto } from './dto/create-student-answer.dto'
import { UpdateStudentAnswerDto } from './dto/update-student-answer.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger'
import { StudentAnswer } from './entities/student-answer.entity'
import { AuthGuard } from 'src/guards/auth.guard'

@ApiTags('Student Answers')
@Controller('student-answers')
@ApiBearerAuth()
@ApiSecurity('bearer')
@UseGuards(AuthGuard)
export class StudentAnswersController {
  constructor(private readonly studentAnswersService: StudentAnswersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new student answer',
    description: 'Creates a new student answer for a specific question including the selected option.',
  })
  @ApiBody({
    type: CreateStudentAnswerDto,
    description: 'Student answer data transfer object',
  })
  @ApiResponse({
    status: 201,
    description: 'The student answer has been successfully created.',
    type: StudentAnswer,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid data provided.',
  })
  create(@Body() createStudentAnswerDto: CreateStudentAnswerDto) {
    return this.studentAnswersService.create(createStudentAnswerDto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all student answers',
    description: 'Retrieves a list of all student answers with their details.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all student answers retrieved successfully.',
    type: [StudentAnswer],
  })
  findAll() {
    return this.studentAnswersService.findAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get a student answer by ID',
    description: 'Retrieves a specific student answer by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Student answer ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'The student answer has been found.',
    type: StudentAnswer,
  })
  @ApiResponse({
    status: 404,
    description: 'Student answer not found.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentAnswersService.findOne(id)
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update a student answer',
    description: "Updates a student answer's information by its ID.",
  })
  @ApiParam({
    name: 'id',
    description: 'Student answer ID to update',
    type: Number,
  })
  @ApiBody({
    type: UpdateStudentAnswerDto,
    description: 'Updated student answer data',
  })
  @ApiResponse({
    status: 200,
    description: 'The student answer has been successfully updated.',
    type: StudentAnswer,
  })
  @ApiResponse({
    status: 404,
    description: 'Student answer not found.',
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateStudentAnswerDto: UpdateStudentAnswerDto) {
    return this.studentAnswersService.update(id, updateStudentAnswerDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a student answer',
    description: 'Removes a student answer from the system by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Student answer ID to delete',
    type: Number,
  })
  @ApiResponse({
    status: 204,
    description: 'The student answer has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Student answer not found.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentAnswersService.remove(id)
  }
}
