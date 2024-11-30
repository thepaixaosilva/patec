import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common'
import { UserSubjectService } from './user-subject.service'
import { CreateUserSubjectDto } from './dto/create-user-subject.dto'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/guards/auth.guard'
import { Roles } from 'src/decorators/roles.decorator'
import { Role } from 'src/enums/roles.enum'

@ApiTags('User Subject Relationships')
@Controller('user-subject')
@ApiBearerAuth()
@ApiSecurity('bearer')
@UseGuards(AuthGuard)
export class UserSubjectController {
  constructor(private readonly userSubjectService: UserSubjectService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Coordinator)
  @ApiOperation({
    summary: 'Create user-subject association',
    description: 'Associates a user with a specific academic subject.',
  })
  @ApiBody({
    type: CreateUserSubjectDto,
    examples: {
      association: {
        value: {
          userRa: '123456',
          subjectId: 'COMP101',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Association created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid user RA or subject ID',
  })
  @ApiResponse({
    status: 409,
    description: 'Association already exists',
  })
  create(@Body() createUserSubjectDto: CreateUserSubjectDto) {
    return this.userSubjectService.create(createUserSubjectDto)
  }

  @Get()
  @ApiOperation({
    summary: 'Get all associations',
    description: 'Retrieves all user-subject associations.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all associations',
  })
  findAll() {
    return this.userSubjectService.findAll()
  }

  @Get('by-ra/:userRa')
  @ApiOperation({
    summary: 'Get subjects by user',
    description: 'Retrieves all subjects associated with a specific user RA.',
  })
  @ApiQuery({
    name: 'ra',
    description: 'User registration number (RA)',
    required: true,
    type: String,
    example: '123456',
  })
  @ApiResponse({
    status: 200,
    description: 'List of subjects for the user',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  findAllByUserRa(@Param('ra') userRa: string) {
    return this.userSubjectService.findAllByUserRa(userRa)
  }

  @Get('by-subject/:subjectId')
  @ApiOperation({
    summary: 'Get users by subject',
    description: 'Retrieves all users associated with a specific subject.',
  })
  @ApiQuery({
    name: 'subjectId',
    description: 'Subject identifier',
    required: true,
    type: String,
    example: 'COMP101',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users enrolled in the subject',
  })
  @ApiResponse({
    status: 404,
    description: 'Subject not found',
  })
  findAllBySubjectId(@Param('subjectId') subjectId: string) {
    return this.userSubjectService.findAllBySubjectId(subjectId)
  }

  @Delete(':userRa/:subjectId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.Coordinator)
  @ApiOperation({
    summary: 'Remove association',
    description: 'Removes the association between a user and a subject.',
  })
  @ApiParam({
    name: 'userRa',
    description: 'User registration number',
    type: String,
    example: '123456',
  })
  @ApiParam({
    name: 'subjectId',
    description: 'Subject identifier',
    type: String,
    example: 'COMP101',
  })
  @ApiResponse({
    status: 204,
    description: 'Association successfully removed',
  })
  @ApiResponse({
    status: 404,
    description: 'Association not found',
  })
  remove(@Param('subjectId') subjectId: string, @Param('userRa') userRa: string) {
    return this.userSubjectService.remove(subjectId, userRa)
  }
}
