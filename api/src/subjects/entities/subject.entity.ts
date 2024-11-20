import { Entity, PrimaryColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty, ApiTags } from '@nestjs/swagger'
import { AnswerKey } from 'src/answer-keys/entities/answer-key.entity'
import { UserSubject } from 'src/user-subject/entities/user-subject.entity'

@ApiTags('Subjects')
@Entity('subjects')
export class Subject {
  @ApiProperty({
    example: 'MAT001',
    description: 'Código único da disciplina',
    minLength: 5,
    maxLength: 20,
    required: true,
  })
  @PrimaryColumn({
    length: 20,
    comment: 'Código identificador único da disciplina',
  })
  subjectId: string

  @ApiProperty({
    example: 'Cálculo I',
    description: 'Nome da disciplina',
    minLength: 3,
    maxLength: 100,
    required: true,
  })
  @Column({
    length: 100,
    comment: 'Nome da disciplina',
  })
  name: string

  @ApiProperty({
    example: 1,
    description: 'Semestre da disciplina',
    minimum: 1,
    maximum: 10,
    required: true,
  })
  @Column({
    type: 'integer',
    comment: 'Semestre em que a disciplina é ministrada',
  })
  semester: number

  @ApiProperty({
    type: () => [UserSubject],
    description: 'Relações entre usuários e esta disciplina',
    required: false,
    isArray: true,
  })
  @OneToMany(() => UserSubject, (userSubject) => userSubject.subject, {
    cascade: ['insert', 'update'],
    eager: false,
  })
  userSubject: UserSubject[]

  @ApiProperty({
    type: () => [AnswerKey],
    description: 'Gabaritos associados a esta disciplina',
    required: false,
    isArray: true,
  })
  @OneToMany(() => AnswerKey, (answerKey) => answerKey.subject, {
    cascade: ['insert', 'update'],
    eager: false,
  })
  answerKeys: AnswerKey[]

  @ApiProperty({
    example: '2024-03-20T10:00:00Z',
    description: 'Data de criação do registro',
    format: 'date-time',
    required: true,
    readOnly: true,
  })
  @CreateDateColumn({
    type: 'datetime',
    comment: 'Data de criação do registro',
  })
  createdAt: Date

  @ApiProperty({
    example: '2024-03-20T10:00:00Z',
    description: 'Data da última atualização do registro',
    format: 'date-time',
    required: true,
    readOnly: true,
  })
  @UpdateDateColumn({
    type: 'datetime',
    comment: 'Data da última atualização',
  })
  updatedAt: Date
}
