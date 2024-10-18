import { Module } from '@nestjs/common'
import { AnswerKeysService } from './answer-keys.service'
import { AnswerKeysController } from './answer-keys.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AnswerKey } from './entities/answer-key.entity'

@Module({
  imports: [TypeOrmModule.forFeature([AnswerKey])],
  controllers: [AnswerKeysController],
  providers: [AnswerKeysService],
})
export class AnswerKeysModule {}
