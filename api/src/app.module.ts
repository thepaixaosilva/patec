import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SubjectsModule } from './subjects/subjects.module';
import { AnswerKeysModule } from './answer-keys/answer-keys.module';
import { StudentAnswersModule } from './student-answers/student-answers.module';
import { TestDaysModule } from './test-days/test-days.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule,
    SubjectsModule,
    AnswerKeysModule,
    StudentAnswersModule,
    TestDaysModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
