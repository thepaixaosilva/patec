import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTestDayDto } from './dto/create-test-day.dto'
import { UpdateTestDayDto } from './dto/update-test-day.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TestDay } from './entities/test-day.entity'

@Injectable()
export class TestDaysService {
  constructor(
    @InjectRepository(TestDay)
    private testDayRepository: Repository<TestDay>
  ) {}

  /**
   * Creates a new test day
   * @param createTestDayDto - Test day creation data
   * @returns Promise with the created test day
   */
  create(createTestDayDto: CreateTestDayDto): Promise<TestDay> {
    const testDay = this.testDayRepository.create(createTestDayDto)
    return this.testDayRepository.save(testDay)
  }

  /**
   * Returns all test days
   * @returns Promise with array of test days ordered by most recent date
   */
  findAll(): Promise<TestDay[]> {
    return this.testDayRepository.find({
      order: {
        testDate: 'DESC', // ordenação padrão por data mais recente
      },
    })
  }

  /**
   * Finds a specific test day
   * @param id - Test day ID
   * @returns Promise with the found test day
   * @throws NotFoundException if the test day is not found
   */
  async findOne(id: number): Promise<TestDay> {
    const testDay = await this.testDayRepository.findOneBy({ id })

    if (!testDay) {
      throw new NotFoundException(`Dia de avaliação com ID ${id} não encontrado`)
    }

    return testDay
  }

  /**
   * Updates a test day
   * @param id - Test day ID
   * @param updateTestDayDto - Update data
   * @returns Promise with the updated test day
   * @throws NotFoundException if the test day is not found
   */
  async update(id: number, updateTestDayDto: UpdateTestDayDto): Promise<TestDay> {
    const testDay = await this.testDayRepository.findOneBy({ id })

    if (!testDay) {
      throw new NotFoundException(`Dia de avaliação com ID ${id} não encontrado`)
    }

    this.testDayRepository.merge(testDay, updateTestDayDto)
    return this.testDayRepository.save(testDay)
  }

  /**
   * Removes a test day
   * @param id - Test day ID
   * @returns Promise with the removed test day
   * @throws NotFoundException if the test day is not found
   */
  async remove(id: number): Promise<TestDay> {
    const testDay = await this.testDayRepository.findOneBy({ id })

    if (!testDay) {
      throw new NotFoundException(`Dia de avaliação com ID ${id} não encontrado`)
    }

    return this.testDayRepository.remove(testDay)
  }

  /**
   * Finds a test day with its answer keys
   * @param id - Test day ID
   * @returns Promise with the test day and its answer keys
   * @throws NotFoundException if the test day is not found
   */
  async findOneWithAnswerKeys(id: number): Promise<TestDay> {
    const testDay = await this.testDayRepository.findOne({
      where: { id },
      relations: ['answerKeys'],
    })

    if (!testDay) {
      throw new NotFoundException(`Dia de avaliação com ID ${id} não encontrado`)
    }

    return testDay
  }
}
