import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateStudentAnswerDto } from './dto/create-student-answer.dto'
import { UpdateStudentAnswerDto } from './dto/update-student-answer.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { StudentAnswer } from './entities/student-answer.entity'

@Injectable()
export class StudentAnswersService {
  constructor(
    @InjectRepository(StudentAnswer)
    private studentAnswersRepository: Repository<StudentAnswer>
  ) {}

  /**
   * Creates a new student answer sheet
   * @param createStudentAnswerDto - Answer sheet creation data
   * @returns Promise with the created answer sheet
   */
  create(createStudentAnswerDto: CreateStudentAnswerDto): Promise<StudentAnswer> {
    const studentAnswer = this.studentAnswersRepository.create(createStudentAnswerDto)
    return this.studentAnswersRepository.save(studentAnswer)
  }

  /**
   * Returns all answer sheets
   * @returns Promise with array of answer sheets
   */
  findAll(): Promise<StudentAnswer[]> {
    return this.studentAnswersRepository.find()
  }

  /**
   * Finds a specific answer sheet
   * @param id - Answer sheet ID
   * @returns Promise with the found answer sheet or null
   */
  findOne(id: number): Promise<StudentAnswer | null> {
    return this.studentAnswersRepository.findOneBy({ id })
  }

  /**
   * Updates an answer sheet
   * @param id - Answer sheet ID
   * @param updateStudentAnswerDto - Update data
   * @returns Promise with the updated answer sheet
   * @throws NotFoundException if the answer sheet is not found
   */
  async update(id: number, updateStudentAnswerDto: UpdateStudentAnswerDto): Promise<StudentAnswer> {
    const studentAnswer = await this.studentAnswersRepository.findOneBy({ id })
    if (!studentAnswer) {
      throw new NotFoundException('Answer sheet not found')
    }
    this.studentAnswersRepository.merge(studentAnswer, updateStudentAnswerDto)
    return this.studentAnswersRepository.save(studentAnswer)
  }

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
}
