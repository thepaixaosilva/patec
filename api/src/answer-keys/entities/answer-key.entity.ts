import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { TestDay } from 'src/test-days/entities/test-day.entity'
import { Subject } from 'src/subjects/entities/subject.entity'
import { StudentAnswer } from 'src/student-answers/entities/student-answer.entity'

@Entity('answer_keys')
export class AnswerKey {
  @ApiProperty({
    example: 1,
    description: 'ID único do gabarito',
  })
  @PrimaryGeneratedColumn({
    comment: 'ID único do gabarito gerado automaticamente',
  })
  id: number

  @ApiProperty({
    example: 'A',
    description: 'Resposta correta da questão 1',
  })
  @Column({
    length: 1,
    comment: 'Resposta correta da primeira questão',
  })
  answer1: string

  @ApiProperty({
    example: 'B',
    description: 'Resposta correta da questão 2',
  })
  @Column({
    length: 1,
    comment: 'Resposta correta da segunda questão',
  })
  answer2: string

  @ApiProperty({
    example: 'C',
    description: 'Resposta correta da questão 3',
  })
  @Column({
    length: 1,
    comment: 'Resposta correta da terceira questão',
  })
  answer3: string

  @ApiProperty({
    example: 'D',
    description: 'Resposta correta da questão 4',
  })
  @Column({
    length: 1,
    comment: 'Resposta correta da quarta questão',
  })
  answer4: string

  @ApiProperty({
    example: 'E',
    description: 'Resposta correta da questão 5',
  })
  @Column({
    length: 1,
    comment: 'Resposta correta da quinta questão',
  })
  answer5: string

  @ApiProperty({
    type: () => TestDay,
    description: 'Dia de prova associado ao gabarito',
  })
  @ManyToOne(() => TestDay, (testDay) => testDay.answerKeys, { onDelete: 'CASCADE' })
  testDay: TestDay

  @ApiProperty({
    type: () => Subject,
    description: 'Disciplina associada ao gabarito',
  })
  @ManyToOne(() => Subject, (subject) => subject.answerKeys, { onDelete: 'CASCADE' })
  subject: Subject

  @ApiProperty({
    type: () => [StudentAnswer],
    description: 'Respostas dos alunos associadas a este gabarito',
  })
  @OneToMany(() => StudentAnswer, (studentAnswer) => studentAnswer.answerKey)
  studentAnswers: StudentAnswer[]
}
