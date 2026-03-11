import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateAnswerKeyDto } from './dto/create-answer-key.dto'
import { UpdateAnswerKeyDto } from './dto/update-answer-key.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { AnswerKey } from './entities/answer-key.entity'
import { Repository } from 'typeorm'
import { format } from 'date-fns'
import { TestDay } from 'src/test-days/entities/test-day.entity'
import { Subject } from 'src/subjects/entities/subject.entity'

@Injectable()
export class AnswerKeysService {
  constructor(
    @InjectRepository(AnswerKey)
    private answerKeyRepository: Repository<AnswerKey>,

    @InjectRepository(TestDay)
    private testDayRepository: Repository<TestDay>,

    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>
  ) {}

  /**
   * Cria um novo gabarito oficial
   * @param createAnswerKeyDto - Dados para criação do gabarito
   * @returns Promise com o gabarito criado
   */
  async create(createAnswerKeyDto: CreateAnswerKeyDto) {
    const answerKey = new AnswerKey()
    answerKey.answer1 = createAnswerKeyDto.answer1
    answerKey.answer2 = createAnswerKeyDto.answer2
    answerKey.answer3 = createAnswerKeyDto.answer3
    answerKey.answer4 = createAnswerKeyDto.answer4
    answerKey.answer5 = createAnswerKeyDto.answer5

    // Buscar as entidades completas pelos IDs
    answerKey.testDay = await this.testDayRepository.findOne({
      where: { id: createAnswerKeyDto.testDayId },
    })

    answerKey.subject = await this.subjectRepository.findOne({
      where: { subjectId: createAnswerKeyDto.subjectId },
    })

    return this.answerKeyRepository.save(answerKey)
  }

  /**
   * Retorna todos os gabaritos oficiais
   * @returns Promise com array de gabaritos
   */
  findAll() {
    return this.answerKeyRepository.find()
  }

  /**
   * Busca um gabarito oficial específico
   * @param id - ID do gabarito
   * @returns Promise com o gabarito encontrado
   */
  findOne(id: number) {
    return this.answerKeyRepository.findOneBy({ id })
  }

  async search(subjectId: string, testDate: string) {
    const formattedDate = format(new Date(testDate.split('-').reverse().join('-')), 'yyyy-MM-dd')

    return this.answerKeyRepository
      .createQueryBuilder('answerKey')
      .innerJoinAndSelect('answerKey.subject', 'subject')
      .innerJoinAndSelect('answerKey.testDay', 'testDay')
      .select(['answerKey', 'testDay'])
      .where('subject.subjectId = :subjectId', { subjectId })
      .andWhere('DATE(testDay.testDate) = :testDate', { testDate: formattedDate }) // Compara apenas a parte da data
      .getMany()
  }

  /**
   * Atualiza um gabarito oficial
   * @param id - ID do gabarito
   * @param updateAnswerKeyDto - Dados para atualização
   * @returns Promise com o gabarito atualizado
   * @throws NotFoundException se o gabarito não for encontrado
   */
  async update(id: number, updateAnswerKeyDto: UpdateAnswerKeyDto) {
    const answerKey = await this.answerKeyRepository.findOneBy({ id })
    if (!answerKey) {
      throw new NotFoundException('Gabarito oficial não encontrado!')
    }
    this.answerKeyRepository.merge(answerKey, updateAnswerKeyDto)
    return this.answerKeyRepository.save(answerKey)
  }

  /**
   * Remove um gabarito oficial
   * @param id - ID do gabarito
   * @returns Promise com o gabarito removido
   * @throws NotFoundException se o gabarito não for encontrado
   */
  async remove(id: number) {
    const answerKey = await this.answerKeyRepository.findOneBy({ id })
    if (!answerKey) {
      throw new NotFoundException('Gabarito oficial não encontrado!')
    }
    return this.answerKeyRepository.remove(answerKey)
  }
}
