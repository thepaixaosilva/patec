import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { StudentAnswer } from 'src/student-answers/entities/student-answer.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, StudentAnswer])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
