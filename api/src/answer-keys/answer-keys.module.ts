import { Module } from '@nestjs/common'
import { AnswerKeysService } from './answer-keys.service'
import { AnswerKeysController } from './answer-keys.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AnswerKey } from './entities/answer-key.entity'
import { Subject } from 'src/subjects/entities/subject.entity'
import { TestDay } from 'src/test-days/entities/test-day.entity'

@Module({
  imports: [TypeOrmModule.forFeature([AnswerKey, Subject, TestDay])],
  controllers: [AnswerKeysController],
  providers: [AnswerKeysService],
  exports: [AnswerKeysService],
})
export class AnswerKeysModule {}
