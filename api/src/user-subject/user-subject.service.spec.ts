import { Test, TestingModule } from '@nestjs/testing'
import { UserSubjectService } from './user-subject.service'

describe('UserSubjectService', () => {
  let service: UserSubjectService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSubjectService],
    }).compile()

    service = module.get<UserSubjectService>(UserSubjectService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
