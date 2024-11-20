import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateAnswerKeyDto } from './dto/create-answer-key.dto'
import { UpdateAnswerKeyDto } from './dto/update-answer-key.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { AnswerKey } from './entities/answer-key.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AnswerKeysService {
  constructor(
    @InjectRepository(AnswerKey)
    private answerKeyRepository: Repository<AnswerKey>
  ) {}

  /**
   * Cria um novo gabarito oficial
   * @param createAnswerKeyDto - Dados para criação do gabarito
   * @returns Promise com o gabarito criado
   */
  create(createAnswerKeyDto: CreateAnswerKeyDto) {
    const answerKey = this.answerKeyRepository.create(createAnswerKeyDto)

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
