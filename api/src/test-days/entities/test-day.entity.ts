import { AnswerKey } from 'src/answer-keys/entities/answer-key.entity'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { TestType } from '../enums/test-type.enum'
import { ApiProperty, ApiTags } from '@nestjs/swagger'

@ApiTags('Test Days')
@Entity('test_days')
export class TestDay {
  @ApiProperty({
    example: 1,
    description: 'ID único do dia de avaliação',
    minimum: 1,
    required: true,
  })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({
    example: '2024-03-20T10:00:00Z',
    description: 'Data e hora da avaliação',
    format: 'date-time',
    required: true,
  })
  @Column({ type: 'datetime' })
  testDate: Date

  @ApiProperty({
    enum: TestType,
    example: TestType.MIDTERM,
    description: 'Tipo da avaliação (MIDTERM, FINAL, QUIZ, PRACTICE)',
    required: true,
  })
  @Column({
    type: 'varchar',
    length: 20,
    comment: 'Tipo da avaliação: MIDTERM, FINAL, QUIZ ou PRACTICE',
  })
  testType: TestType

  @ApiProperty({
    example: 'uploads/test-days/arquivo123.pdf',
    description: 'Caminho do arquivo no sistema de armazenamento',
    required: false,
  })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Caminho do arquivo no sistema de armazenamento',
  })
  filePath: string;

  @ApiProperty({
    type: () => [AnswerKey],
    description: 'Gabaritos associados a esta avaliação',
    required: false,
    isArray: true,
  })
  @OneToMany(() => AnswerKey, (answerKey) => answerKey.testDay, {
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
  @CreateDateColumn({ type: 'datetime', comment: 'Data de criação do registro' })
  createdAt: Date

  @ApiProperty({
    example: '2024-03-20T10:00:00Z',
    description: 'Data da última atualização do registro',
    format: 'date-time',
    required: true,
    readOnly: true,
  })
  @UpdateDateColumn({ type: 'datetime', comment: 'Data da última atualização' })
  updatedAt: Date
}
