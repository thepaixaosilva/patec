import { AnswerKey } from 'src/answer-keys/entities/answer-key.entity'
import { User } from 'src/users/entities/user.entity'
import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm'

@Entity()
export class Subject {
  @PrimaryColumn()
  subjectId: string

  @Column()
  name: string

  @Column()
  semester: number

  @ManyToMany(() => User, (user) => user.subjects)
  users: User[]

  @OneToMany(() => AnswerKey, (answerKey) => answerKey.subject)
  answerKeys: AnswerKey[]
}
