import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { TestDaysService } from './test-days.service'
import { CreateTestDayDto } from './dto/create-test-day.dto'
import { UpdateTestDayDto } from './dto/update-test-day.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger'
import { TestDay } from './entities/test-day.entity'
import { TestType } from './enums/test-type.enum'
import { AuthGuard } from 'src/guards/auth.guard'
import { Roles } from 'src/decorators/roles.decorator'
import { Role } from 'src/enums/roles.enum'

@ApiTags('Test days')
@Controller('test-days')
@ApiBearerAuth()
@ApiSecurity('bearer')
@UseGuards(AuthGuard)
export class TestDaysController {
  constructor(private readonly testDaysService: TestDaysService) {}

  @Post()
  @Roles(Role.Coordinator)
  @ApiOperation({
    summary: 'Create a new test day',
    description: 'Creates a new test day with the specified date and test type.',
  })
  @ApiBody({
    type: CreateTestDayDto,
    description: 'Test day creation data',
    examples: {
      testDay: {
        value: {
          testDate: new Date(),
          testType: TestType.MIDTERM,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The test day has been successfully created.',
    type: TestDay,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid date, test type, or missing required fields.',
  })
  create(@Body() createTestDayDto: CreateTestDayDto) {
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
