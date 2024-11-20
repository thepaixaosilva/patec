import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { ApiProperty, ApiTags } from '@nestjs/swagger'
import { AnswerKey } from 'src/answer-keys/entities/answer-key.entity'
import { User } from 'src/users/entities/user.entity'

@ApiTags('Student Answers')
@Entity('student_answers')
export class StudentAnswer {
  @ApiProperty({
    example: 1,
    description: 'ID único da resposta do aluno',
    minimum: 1,
    required: true,
  })
  @PrimaryGeneratedColumn({
    comment: 'ID único da resposta do aluno gerado automaticamente',
  })
  id: number

  @ApiProperty({
    example: 8.0,
    description: 'Pontuação obtida pelo aluno',
    minimum: 0,
    maximum: 10,
    required: true,
  })
  @Column({
    type: 'decimal',
    precision: 4,
    scale: 2,
    comment: 'Pontuação obtida pelo aluno na avaliação',
  })
  score: number

  @ApiProperty({
    example: 'A',
    description: 'Resposta do aluno para a questão 1',
    minLength: 1,
    maxLength: 1,
    pattern: '^[A-E]$',
    required: true,
  })
  @Column({
    length: 1,
    comment: 'Resposta do aluno para a primeira questão',
  })
  answer1: string

  @ApiProperty({
    example: 'B',
    description: 'Resposta do aluno para a questão 2',
    minLength: 1,
    maxLength: 1,
    pattern: '^[A-E]$',
    required: true,
  })
  @Column({
    length: 1,
    comment: 'Resposta do aluno para a segunda questão',
  })
  answer2: string

  @ApiProperty({
    example: 'C',
    description: 'Resposta do aluno para a questão 3',
    minLength: 1,
    maxLength: 1,
    pattern: '^[A-E]$',
    required: true,
  })
  @Column({
    length: 1,
    comment: 'Resposta do aluno para a terceira questão',
  })
  answer3: string

  @ApiProperty({
    example: 'D',
    description: 'Resposta do aluno para a questão 4',
    minLength: 1,
    maxLength: 1,
    pattern: '^[A-E]$',
    required: true,
  })
  @Column({
    length: 1,
    comment: 'Resposta do aluno para a quarta questão',
  })
  answer4: string

  @ApiProperty({
    example: 'E',
    description: 'Resposta do aluno para a questão 5',
    minLength: 1,
    maxLength: 1,
    pattern: '^[A-E]$',
    required: true,
  })
  @Column({
    length: 1,
    comment: 'Resposta do aluno para a quinta questão',
  })
  answer5: string

  @ApiProperty({
    type: () => User,
    description: 'Usuário (aluno) que forneceu as respostas',
    required: true,
  })
  @ManyToOne(() => User, (user) => user.answers, { onDelete: 'CASCADE' })
  user: User

  @ApiProperty({
    type: () => AnswerKey,
    description: 'Gabarito associado às respostas do aluno',
    required: true,
  })
  @ManyToOne(() => AnswerKey, (answerKey) => answerKey.studentAnswers, { onDelete: 'CASCADE' })
  answerKey: AnswerKey
}
