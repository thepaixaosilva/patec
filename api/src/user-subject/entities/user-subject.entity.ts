import { Subject } from 'src/subjects/entities/subject.entity'
import { User } from 'src/users/entities/user.entity'
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity('user_subject')
@Index(['userRa', 'subjectId'], { unique: true })
export class UserSubject {
  @PrimaryColumn()
  userId: number

  @PrimaryColumn()
  subjectId: string

  @Column({
    length: 20,
    nullable: true,
  })
  userRa: string

  @ManyToOne(() => User, (user) => user.userSubject, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' }) // Relacionamento pela PK
  user: User

  @ManyToOne(() => Subject, (subject) => subject.userSubject, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subjectId' })
  subject: Subject
}
