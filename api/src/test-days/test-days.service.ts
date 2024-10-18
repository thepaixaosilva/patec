import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestDayDto } from './dto/create-test-day.dto';
import { UpdateTestDayDto } from './dto/update-test-day.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestDay } from './entities/test-day.entity';

@Injectable()
export class TestDaysService {
  constructor(
    @InjectRepository(TestDay)
    private testDayRepository: Repository<TestDay>,
  ) {}

  create(createTestDayDto: CreateTestDayDto) {
    const testDay = this.testDayRepository.create(createTestDayDto);

    return this.testDayRepository.save(testDay);
  }

  findAll() {
    return this.testDayRepository.find();
  }

  findOne(id: number) {
    return this.testDayRepository.findOneBy({ id });
  }

  async update(id: number, updateTestDayDto: UpdateTestDayDto) {
    const testDay = await this.testDayRepository.findOneBy({ id });
    if (!testDay) {
      throw new NotFoundException('Dia da avaliação não encontrado');
    }
    this.testDayRepository.merge(testDay, updateTestDayDto);
    return this.testDayRepository.save(testDay);
  }

  async remove(id: number) {
    const testDay = await this.testDayRepository.findOneBy({ id });
    if (!testDay) {
      throw new NotFoundException('Dia da avaliação não encontrado');
    }
    return this.testDayRepository.remove(testDay);
  }
}
