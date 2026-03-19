import { Module } from '@nestjs/common'
import { UserSubjectService } from './user-subject.service'
import { UserSubjectController } from './user-subject.controller'
import { Subject } from 'src/modules/subjects/entities/subject.entity'
import { User } from 'src/modules/users/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserSubject } from './entities/user-subject.entity'
import { UsersService } from 'src/modules/users/users.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Subject, UserSubject])],
  controllers: [UserSubjectController],
  providers: [UserSubjectService, UsersService],
  exports: [UserSubjectService],
})
export class UserSubjectModule { }
