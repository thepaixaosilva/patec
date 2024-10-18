import { StudentAnswer } from 'src/student-answers/entities/student-answer.entity'
import { Subject } from 'src/subjects/entities/subject.entity'
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  ra: string

  @Column({ nullable: true })
  rf: string

  @Column()
  email: string

  @Column()
  profile: string

  @Column()
  password: string

  @ManyToMany(() => Subject, (subject) => subject.users)
  subjects: Subject[]

  @OneToMany(() => StudentAnswer, (studentAnswer) => studentAnswer.user)
  answers: StudentAnswer[]
}
