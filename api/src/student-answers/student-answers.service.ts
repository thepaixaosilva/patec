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

  create(createStudentAnswerDto: CreateStudentAnswerDto) {
    const studentAnswer = this.studentAnswersRepository.create(createStudentAnswerDto)

    return this.studentAnswersRepository.save(studentAnswer)
  }

  findAll() {
    return this.studentAnswersRepository.find()
  }

  findOne(id: number) {
    return this.studentAnswersRepository.findOneBy({ id })
  }

  async update(id: number, updateStudentAnswerDto: UpdateStudentAnswerDto) {
    const studentAnswer = await this.studentAnswersRepository.findOneBy({ id })
    if (!studentAnswer) {
      throw new NotFoundException('Folha de respostas não encontrado')
    }
    this.studentAnswersRepository.merge(studentAnswer, updateStudentAnswerDto)
    return this.studentAnswersRepository.save(studentAnswer)
  }

  async remove(id: number) {
    const studentAnswer = await this.studentAnswersRepository.findOneBy({ id })
    if (!studentAnswer) {
      throw new NotFoundException('Folha de respostas não encontrado')
    }
    return this.studentAnswersRepository.remove(studentAnswer)
  }
}
