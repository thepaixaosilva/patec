import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, UseInterceptors, ClassSerializerInterceptor, UseGuards, ParseIntPipe, Put } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger'
import { User } from './entities/user.entity'
import { Roles } from 'src/decorators/roles.decorator'
import { Role } from 'src/enums/roles.enum'
import { AuthGuard } from 'src/guards/auth.guard'

@ApiTags('Users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiSecurity('bearer')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.Coordinator)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create new user',
    description: 'Creates a new user with the provided data including email, name, RA and role.',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'User data transfer object',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: User,
  })
  @ApiResponse({
    status: 409,
    description: 'Email or RA already in use',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieves a list of all users with their details.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all users retrieved successfully',
    type: [User],
  })
  findAll() {
    return this.usersService.findAll()
  }

  @Get('students')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieves a list of all users with their details.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all users retrieved successfully',
    type: [User],
  })
  findAllStudents() {
    return this.usersService.findAllStudents()
  }

  @Get(':ra')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get user by RA',
    description: 'Retrieves a specific user by their RA.',
  })
  @ApiParam({
    name: 'ra',
    description: 'User RA',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  findOne(@Param('ra') ra: string) {
    return this.usersService.findOne(ra)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieves a specific user by their ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOneById(id)
  }

  @Put(':ra')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.Coordinator)
  @ApiOperation({
    summary: 'Update user',
    description: "Updates a user's information by their RA.",
  })
  @ApiParam({
    name: 'ra',
    description: 'User RA to update',
    type: Number,
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Updated user data',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Email already in use',
  })
  update(@Param('ra') ra: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(ra, updateUserDto)
  }

  @Delete(':ra')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.Coordinator)
  @ApiOperation({
    summary: 'Remove user',
    description: 'Removes a user from the system by their RA.',
  })
  @ApiParam({
    name: 'ra',
    description: 'User ID to delete',
    type: Number,
  })
  @ApiResponse({
    status: 204,
    description: 'User removed successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  remove(@Param('ra') ra: string) {
    return this.usersService.remove(ra)
  }
}
