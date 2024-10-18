import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerKeyDto } from './dto/create-answer-key.dto';
import { UpdateAnswerKeyDto } from './dto/update-answer-key.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerKey } from './entities/answer-key.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerKeysService {
  constructor(
    @InjectRepository(AnswerKey)
    private answerKeyRepository: Repository<AnswerKey>,
  ) {}

  create(createAnswerKeyDto: CreateAnswerKeyDto) {
    const answerKey = this.answerKeyRepository.create(createAnswerKeyDto);

    return this.answerKeyRepository.save(answerKey);
  }

  findAll() {
    return this.answerKeyRepository.find();
  }

  findOne(id: number) {
    return this.answerKeyRepository.findOneBy({ id });
  }

  async update(id: number, updateAnswerKeyDto: UpdateAnswerKeyDto) {
    const answerKey = await this.answerKeyRepository.findOneBy({ id });
    if (!answerKey) {
      throw new NotFoundException('Gabarito oficial não encontrado!');
    }
    this.answerKeyRepository.merge(answerKey, updateAnswerKeyDto);
    return this.answerKeyRepository.save(answerKey);
  }

  async remove(id: number) {
    const answerKey = await this.answerKeyRepository.findOneBy({ id });
    if (!answerKey) {
      throw new NotFoundException('Gabarito oficial não encontrado!');
    }
    return this.answerKeyRepository.remove(answerKey);
  }
}
