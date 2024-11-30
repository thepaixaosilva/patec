import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateStudentAnswerDto } from './dto/create-student-answer.dto'
// import { UpdateStudentAnswerDto } from './dto/update-student-answer.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { StudentAnswer } from './entities/student-answer.entity'
import { AnswerKey } from 'src/answer-keys/entities/answer-key.entity'
import { AnswerKeysService } from 'src/answer-keys/answer-keys.service'

@Injectable()
export class StudentAnswersService {
  constructor(
    @InjectRepository(StudentAnswer)
    private studentAnswersRepository: Repository<StudentAnswer>,
    private answerKeysService: AnswerKeysService
  ) {}

  async create(subjectId: string, testDate: string, createStudentAnswerDto: CreateStudentAnswerDto): Promise<StudentAnswer> {
    const answerKeys = await this.answerKeysService.search(subjectId, testDate)

    if (answerKeys.length === 0) {
      throw new NotFoundException('Nenhum gabarito encontrado para esta disciplina e data')
    }

    const answerKey = answerKeys[0]

    // Calcular pontuação
    const totalQuestions = 5
    const pointsPerQuestion = 2 // Cada questão vale 2 pontos

    const score = this.calculateScore(createStudentAnswerDto, answerKey, totalQuestions, pointsPerQuestion)

    // Cria o objeto de resposta do estudante
    const studentAnswerData = {
      ...createStudentAnswerDto,
      answerKey: answerKey,
      score: score,
    }

    const studentAnswer = this.studentAnswersRepository.create(studentAnswerData)

    return this.studentAnswersRepository.save(studentAnswer)
  }

  /**
   * Returns all answer sheets
   * @returns Promise with array of answer sheets
   */
  async findAll(): Promise<any[]> {
    return this.studentAnswersRepository
      .createQueryBuilder('studentAnswer')
      .leftJoinAndSelect('studentAnswer.user', 'user')
      .select(['studentAnswer', 'user.id', 'user.name', 'user.email'])
      .getMany()
  }

  /**
   * Finds a specific answer sheet
   * @param id - Answer sheet ID
   * @returns Promise with the found answer sheet or null
   */
  findOne(id: number): Promise<StudentAnswer | null> {
    return this.studentAnswersRepository.findOneBy({ id })
  }

  // /**
  //  * Updates an answer sheet
  //  * @param id - Answer sheet ID
  //  * @param updateStudentAnswerDto - Update data
  //  * @returns Promise with the updated answer sheet
  //  * @throws NotFoundException if the answer sheet is not found
  //  */
  // async update(id: number, updateStudentAnswerDto: UpdateStudentAnswerDto): Promise<StudentAnswer> {
  //   const studentAnswer = await this.studentAnswersRepository.findOneBy({ id })
  //   if (!studentAnswer) {
  //     throw new NotFoundException('Answer sheet not found')
  //   }
  //   this.studentAnswersRepository.merge(studentAnswer, updateStudentAnswerDto)
  //   return this.studentAnswersRepository.save(studentAnswer)
  // }

  /**
   * Removes an answer sheet
   * @param id - Answer sheet ID
   * @returns Promise with the removed answer sheet
   * @throws NotFoundException if the answer sheet is not found
   */
  async remove(id: number): Promise<StudentAnswer> {
    const studentAnswer = await this.studentAnswersRepository.findOneBy({ id })
    if (!studentAnswer) {
      throw new NotFoundException('Answer sheet not found')
    }
    return this.studentAnswersRepository.remove(studentAnswer)
  }

  private calculateScore(
    studentAnswers: CreateStudentAnswerDto,
    answerKey: AnswerKey, 
    totalQuestions: number, 
    pointsPerQuestion: number
  ): number {

    const answerFields = [
      'answer1', 
      'answer2', 
      'answer3', 
      'answer4', 
      'answer5'
    ]

    const correctAnswers = answerFields.filter((field) => studentAnswers[field] === answerKey[field]).length

    return correctAnswers * pointsPerQuestion
  }
}
