import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentAnswersService } from './student-answers.service';
import { CreateStudentAnswerDto } from './dto/create-student-answer.dto';
import { UpdateStudentAnswerDto } from './dto/update-student-answer.dto';

@Controller('student-answers')
export class StudentAnswersController {
  constructor(private readonly studentAnswersService: StudentAnswersService) {}

  @Post()
  create(@Body() createStudentAnswerDto: CreateStudentAnswerDto) {
    return this.studentAnswersService.create(createStudentAnswerDto);
  }

  @Get()
  findAll() {
    return this.studentAnswersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentAnswersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentAnswerDto: UpdateStudentAnswerDto,
  ) {
    return this.studentAnswersService.update(+id, updateStudentAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentAnswersService.remove(+id);
  }
}
