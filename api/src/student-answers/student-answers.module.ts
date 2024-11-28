import { Module } from '@nestjs/common'
import { StudentAnswersService } from './student-answers.service'
import { StudentAnswersController } from './student-answers.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StudentAnswer } from './entities/student-answer.entity'
import { AnswerKeysModule } from 'src/answer-keys/answer-keys.module'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentAnswer]),
    AnswerKeysModule, // Adicione esta importação
    UsersModule, // Se necessário
  ],
  controllers: [StudentAnswersController],
  providers: [StudentAnswersService],
  exports: [StudentAnswersService],
})
export class StudentAnswersModule {}
