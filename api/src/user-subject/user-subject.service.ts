import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateUserSubjectDto } from './dto/create-user-subject.dto'
import { UserSubject } from './entities/user-subject.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import * as fs from 'fs'
import { parse } from 'csv-parse/sync'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class UserSubjectService {
  constructor(
    @InjectRepository(UserSubject)
    private readonly userSubjectRepository: Repository<UserSubject>,

    private readonly userService: UsersService
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

  async removeAllSubject(subjectId: string) {
    const userSubject = await this.userSubjectRepository.find({ where: { subjectId } })

    if (!userSubject) {
      throw new NotFoundException('Matrícula não encontrada')
    }

    try {
      await this.userSubjectRepository.remove(userSubject)
    } catch (error) {
      throw new InternalServerErrorException('Erro ao remover matrícula: ' + error)
    }
  }
  /*
  async uploadStudents(subjectId: string, students: { ra: string; name: string }[]) {
    // Remover alunos atuais
    await this.removeAllSubject(subjectId);
  
    // Adicionar novos alunos
    const newUsers = students.map((student) => ({
      ra: student.ra,
      name: student.name,
      subjectId,
    }));
  
    try {
      await this.userSubjectRepository.save(newUsers);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao salvar alunos: ' + error);
    }
  }*/

  async processCsv(filePath: string, subjectId: string) {
    const csvData = fs.readFileSync(filePath, 'utf8')

    // Parse CSV para extrair alunos
    const students = parse(csvData, { columns: true }).map((row: any) => ({
      ra: row.ra.trim(),
      name: row.name.trim(),
      subjectId,
    }))

    // Remover alunos existentes
    await this.removeAllSubject(subjectId)

    // Inserir novos alunos
    try {
      for (let student of students) {
        student = await this.userService.findOne(student.ra)
        await this.userSubjectRepository.save({ userId: student.id, subjectId, userRa: student.ra})
      }
    } catch (error) {
      throw new InternalServerErrorException('Erro ao salvar novos alunos: ' + error)
    }

    // Remover arquivo do disco após processamento
    fs.unlinkSync(filePath)
  }
}
