import { Test, TestingModule } from '@nestjs/testing'
import { UserSubjectController } from './user-subject.controller'
import { UserSubjectService } from './user-subject.service'

describe('UserSubjectController', () => {
  let controller: UserSubjectController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSubjectController],
      providers: [UserSubjectService],
    }).compile()

    controller = module.get<UserSubjectController>(UserSubjectController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
