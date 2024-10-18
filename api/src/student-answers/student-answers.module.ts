import { Module } from '@nestjs/common'
import { StudentAnswersService } from './student-answers.service'
import { StudentAnswersController } from './student-answers.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StudentAnswer } from './entities/student-answer.entity'

@Module({
  imports: [TypeOrmModule.forFeature([StudentAnswer])],
  controllers: [StudentAnswersController],
  providers: [StudentAnswersService],
})
export class StudentAnswersModule {}
