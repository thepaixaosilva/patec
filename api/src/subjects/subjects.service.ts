import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Subject } from './entities/subject.entity'
import { CreateSubjectDto } from './dto/create-subject.dto'
import { UpdateSubjectDto } from './dto/update-subject.dto'

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>
  ) {}

  /**
   * Creates a new subject
   * @param createSubjectDto - Subject creation data
   * @returns Promise with the created subject
   * @throws ConflictException if a subject with the same code already exists
   */
  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const existingSubject = await this.subjectRepository.findOneBy({
      subjectId: createSubjectDto.subjectId,
    })

    if (existingSubject) {
      throw new ConflictException(`Já existe uma disciplina com o código ${createSubjectDto.subjectId}`)
    }

    const subject = this.subjectRepository.create(createSubjectDto)
    return this.subjectRepository.save(subject)
  }

  /**
   * Returns all subjects
   * @returns Promise with array of subjects ordered by semester and name
   */
  findAll(): Promise<Subject[]> {
    return this.subjectRepository.find({
      order: {
        semester: 'ASC',
        name: 'ASC',
      },
    })
  }

  /**
   * Finds a specific subject
   * @param id - Subject code
   * @returns Promise with the found subject
   * @throws NotFoundException if the subject is not found
   */
  async findOne(id: string): Promise<Subject> {
    const subject = await this.subjectRepository.findOneBy({ subjectId: id })

    if (!subject) {
      throw new NotFoundException(`Disciplina com código ${id} não encontrada`)
    }

    return subject
  }

  /**
   * Updates a subject
   * @param id - Subject code
   * @param updateSubjectDto - Update data
   * @returns Promise with the updated subject
   * @throws NotFoundException if the subject is not found
   */
  async update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
    const subject = await this.subjectRepository.findOneBy({ subjectId: id })

    if (!subject) {
      throw new NotFoundException(`Disciplina com código ${id} não encontrada`)
    }

    this.subjectRepository.merge(subject, updateSubjectDto)
    return this.subjectRepository.save(subject)
  }

  /**
   * Removes a subject
   * @param id - Subject code
   * @returns Promise with the removed subject
   * @throws NotFoundException if the subject is not found
   */
  async remove(id: string): Promise<Subject> {
    const subject = await this.subjectRepository.findOneBy({ subjectId: id })

    if (!subject) {
      throw new NotFoundException(`Disciplina com código ${id} não encontrada`)
    }

    return this.subjectRepository.remove(subject)
  }

  /**
   * Finds a subject with all its relationships
   * @param id - Subject code
   * @returns Promise with the subject and its relationships
   * @throws NotFoundException if the subject is not found
   */
  async findOneWithRelations(id: string): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({
      where: { subjectId: id },
      relations: ['userSubject', 'answerKeys'],
    })

    if (!subject) {
      throw new NotFoundException(`Disciplina com código ${id} não encontrada`)
    }

    return subject
  }

  /**
   * Finds subjects by semester
   * @param semester - Semester number
   * @returns Promise with array of subjects for the specified semester
   */
  async findBySemester(semester: number): Promise<Subject[]> {
    return this.subjectRepository.find({
      where: { semester },
      order: { name: 'ASC' },
    })
  }
}
