import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnswerKeysService } from './answer-keys.service';
import { CreateAnswerKeyDto } from './dto/create-answer-key.dto';
import { UpdateAnswerKeyDto } from './dto/update-answer-key.dto';

@Controller('answer-keys')
export class AnswerKeysController {
  constructor(private readonly answerKeysService: AnswerKeysService) {}

  @Post()
  create(@Body() createAnswerKeyDto: CreateAnswerKeyDto) {
    return this.answerKeysService.create(createAnswerKeyDto);
  }

  @Get()
  findAll() {
    return this.answerKeysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerKeysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerKeyDto: UpdateAnswerKeyDto) {
    return this.answerKeysService.update(+id, updateAnswerKeyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerKeysService.remove(+id);
  }
}
