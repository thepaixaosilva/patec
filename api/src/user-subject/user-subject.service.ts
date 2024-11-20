import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateUserSubjectDto } from './dto/create-user-subject.dto'
import { UserSubject } from './entities/user-subject.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserSubjectService {
  constructor(
    @InjectRepository(UserSubject)
    private readonly userSubjectRepository: Repository<UserSubject>
  ) {}

  /**
   * Creates a new user-subject enrollment
   * @param createUserSubjectDto - Enrollment creation data
   * @returns Promise with the created enrollment
   * @throws ConflictException if the student is already enrolled in the subject
   */
  async create(createUserSubjectDto: CreateUserSubjectDto) {
    const existingUserSubject = await this.userSubjectRepository.findOneBy({
      subjectId: createUserSubjectDto.subjectId,
      userRa: createUserSubjectDto.userRa,
    })

    if (existingUserSubject) {
      throw new ConflictException(`O aluno com RA ${createUserSubjectDto.userRa} já está matriculado na disciplina ${createUserSubjectDto.subjectId}`)
    }

    const userSubject = this.userSubjectRepository.create(createUserSubjectDto)
    return this.userSubjectRepository.save(userSubject)
  }

  /**
   * Returns all enrollments
   * @returns Promise with array of enrollments with user and subject relations
   */
  async findAll() {
    return this.userSubjectRepository.find({
      relations: ['user', 'subject'],
    })
  }

  /**
   * Finds all enrollments by user RA
   * @param userRa - User's RA
   * @returns Promise with array of enrollments for the specified user
   */
  async findAllByUserRa(userRa: string) {
    return this.userSubjectRepository.find({
      where: { userRa },
      relations: ['user', 'subject'],
    })
  }

  /**
   * Finds all enrollments by subject ID
   * @param subjectId - Subject ID
   * @returns Promise with array of enrollments for the specified subject
   */
  async findAllBySubjectId(subjectId: string) {
    return this.userSubjectRepository.find({
      where: { subjectId },
      relations: ['user', 'subject'],
    })
  }

  /**
   * Removes an enrollment
   * @param subjectId - Subject ID
   * @param userRa - User's RA
   * @throws NotFoundException if the enrollment is not found
   * @throws InternalServerErrorException if there's an error removing
   */
  async remove(subjectId: string, userRa: string) {
    const userSubject = await this.userSubjectRepository.findOneBy({
      subjectId,
      userRa,
    })

    if (!userSubject) {
      throw new NotFoundException('Matrícula não encontrada')
    }

    try {
      await this.userSubjectRepository.remove(userSubject)
    } catch (error) {
      throw new InternalServerErrorException('Erro ao remover matrícula: ' + error)
    }
  }
}
