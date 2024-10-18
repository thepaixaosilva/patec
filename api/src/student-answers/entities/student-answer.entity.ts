import { AnswerKey } from 'src/answer-keys/entities/answer-key.entity'
import { User } from 'src/users/entities/user.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class StudentAnswer {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  score: number

  @Column()
  answer1: string

  @Column()
  answer2: string

  @Column()
  answer3: string

  @Column()
  answer4: string

  @Column()
  answer5: string

  @ManyToOne(() => User, (user) => user.answers)
  user: User

  @ManyToOne(() => AnswerKey, (answerKey) => answerKey.studentAnswers)
  answerKey: AnswerKey
}
