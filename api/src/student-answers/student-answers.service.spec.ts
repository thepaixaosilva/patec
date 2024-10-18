import { Test, TestingModule } from '@nestjs/testing'
import { StudentAnswersService } from './student-answers.service'

describe('StudentAnswersService', () => {
  let service: StudentAnswersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentAnswersService],
    }).compile()

    service = module.get<StudentAnswersService>(StudentAnswersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
