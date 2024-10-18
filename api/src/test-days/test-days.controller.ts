import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestDaysService } from './test-days.service';
import { CreateTestDayDto } from './dto/create-test-day.dto';
import { UpdateTestDayDto } from './dto/update-test-day.dto';

@Controller('test-days')
export class TestDaysController {
  constructor(private readonly testDaysService: TestDaysService) {}

  @Post()
  create(@Body() createTestDayDto: CreateTestDayDto) {
    return this.testDaysService.create(createTestDayDto);
  }

  @Get()
  findAll() {
    return this.testDaysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testDaysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDayDto: UpdateTestDayDto) {
    return this.testDaysService.update(+id, updateTestDayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testDaysService.remove(+id);
  }
}
