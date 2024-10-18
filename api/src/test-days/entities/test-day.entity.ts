import { AnswerKey } from 'src/answer-keys/entities/answer-key.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class TestDay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  testDate: Date;

  @Column()
  testType: string;

  @OneToMany(() => AnswerKey, (answerKey) => answerKey.testDay)
  answerKeys: AnswerKey[];
}
