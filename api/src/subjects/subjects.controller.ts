import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { SubjectsService } from './subjects.service'
import { CreateSubjectDto } from './dto/create-subject.dto'
import { UpdateSubjectDto } from './dto/update-subject.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger'
import { Subject } from './entities/subject.entity'
import { AuthGuard } from 'src/guards/auth.guard'
import { Roles } from 'src/decorators/roles.decorator'
import { Role } from 'src/enums/roles.enum'

@ApiTags('Subjects')
@Controller('subjects')
@ApiBearerAuth()
@ApiSecurity('bearer')
@UseGuards(AuthGuard)
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  @Roles(Role.Coordinator)
  @ApiOperation({
    summary: 'Create subject',
    description: 'Creates a new academic subject with specified details.',
  })
  @ApiBody({
    type: CreateSubjectDto,
    examples: {
      subject: {
        value: {
          id: 'COMP101',
          name: 'Introduction to Computing',
          semester: '2024/1',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Subject created successfully',
    type: Subject,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid data provided.',
  })
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto)
  }

  @Get()
  @ApiOperation({
    summary: 'Get all subjects',
    description: 'Retrieves a list of all subjects with their details.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all subjects retrieved successfully.',
    type: [Subject],
  })
  findAll() {
    return this.subjectsService.findAll()
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a subject by ID',
    description: 'Retrieves a specific subject by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Subject ID',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The subject has been found.',
    type: Subject,
  })
  @ApiResponse({
    status: 404,
    description: 'Subject not found.',
  })
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(id)
  }

  @Patch(':id')
  @Roles(Role.Coordinator)
  @ApiOperation({
    summary: 'Update a subject',
    description: "Updates a subject's information by its ID.",
  })
  @ApiParam({
    name: 'id',
    description: 'Subject ID to update',
    type: String,
  })
  @ApiBody({
    type: UpdateSubjectDto,
    description: 'Updated subject data',
  })
  @ApiResponse({
    status: 200,
    description: 'The subject has been successfully updated.',
    type: Subject,
  })
  @ApiResponse({
    status: 404,
    description: 'Subject not found.',
  })
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(id, updateSubjectDto)
  }

  @Delete(':id')
  @Roles(Role.Coordinator)
  @ApiOperation({
    summary: 'Delete a subject',
    description: 'Removes a subject from the system by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Subject ID to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The subject has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Subject not found.',
  })
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(id)
  }
}
