import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TestDay } from 'src/test-days/entities/test-day.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { StudentAnswer } from 'src/student-answers/entities/student-answer.entity';

@Entity()
export class AnswerKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer1: string;

  @Column()
  answer2: string;

  @Column()
  answer3: string;

  @Column()
  answer4: string;

  @Column()
  answer5: string;

  @ManyToOne(() => TestDay, (testDay) => testDay.answerKeys)
  testDay: TestDay;

  @ManyToOne(() => Subject, (subject) => subject.answerKeys)
  subject: Subject;

  @OneToMany(() => StudentAnswer, (studentAnswer) => studentAnswer.answerKey)
  studentAnswers: StudentAnswer[];
}
