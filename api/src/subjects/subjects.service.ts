import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateSubjectDto } from './dto/create-subject.dto'
import { UpdateSubjectDto } from './dto/update-subject.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Subject } from './entities/subject.entity'

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>
  ) {}

  create(createSubjectDto: CreateSubjectDto) {
    const subject = this.subjectRepository.create(createSubjectDto)

    return this.subjectRepository.save(subject)
  }

  findAll() {
    return this.subjectRepository.find()
  }

  findOne(subjectId: string) {
    return this.subjectRepository.findOneBy({ subjectId })
  }

  async update(subjectId: string, updateSubjectDto: UpdateSubjectDto) {
    const subject = await this.subjectRepository.findOneBy({ subjectId })
    if (!subject) {
      throw new NotFoundException('Disciplina não encontrada!')
    }
    this.subjectRepository.merge(subject, updateSubjectDto)
    return this.subjectRepository.save(subject)
  }

  async remove(subjectId: string) {
    const subject = await this.subjectRepository.findOneBy({ subjectId })
    if (!subject) {
      throw new NotFoundException('Disciplina não encontrada!')
    }
    return this.subjectRepository.remove(subject)
  }
}
