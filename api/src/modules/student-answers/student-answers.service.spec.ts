import { Test, TestingModule } from '@nestjs/testing'
import { StudentAnswersService } from './student-answers.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { StudentAnswer } from './entities/student-answer.entity'
import { AnswerKeysService } from 'src/modules/answer-keys/answer-keys.service'
import { NotFoundException } from '@nestjs/common'

describe('StudentAnswersService', () => {
  let service: StudentAnswersService

  const queryBuilder = {
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  }

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    createQueryBuilder: jest.fn(() => queryBuilder),
    findOneBy: jest.fn(),
    remove: jest.fn(),
  }

  const mockAnswerKeysService = {
    search: jest.fn(),
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentAnswersService,
        { provide: getRepositoryToken(StudentAnswer), useValue: mockRepository },
        { provide: AnswerKeysService, useValue: mockAnswerKeysService },
      ],
    }).compile()

    service = module.get<StudentAnswersService>(StudentAnswersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('deve calcular nota e salvar resposta', async () => {
    const dto = {
      answer1: 'A',
      answer2: 'B',
      answer3: 'C',
      answer4: 'D',
      answer5: 'E',
      user: { id: 1 },
      answerKey: { id: 99 },
      score: 0,
    }
    const answerKey = { id: 99, answer1: 'A', answer2: 'B', answer3: 'X', answer4: 'D', answer5: 'Y' }

    mockAnswerKeysService.search.mockResolvedValue([answerKey])
    mockRepository.create.mockImplementation((input) => input)
    mockRepository.save.mockImplementation(async (input) => ({ id: 10, ...input }))

    const result = await service.create('ADM0000', '19-03-2026', dto as any)

    expect(result).toEqual(expect.objectContaining({ id: 10, score: 6 }))
    expect(mockAnswerKeysService.search).toHaveBeenCalledWith('ADM0000', '19-03-2026')
  })

  it('deve falhar quando nao houver gabarito', async () => {
    mockAnswerKeysService.search.mockResolvedValue([])

    await expect(service.create('ADM0000', '19-03-2026', {} as any)).rejects.toThrow(NotFoundException)
  })

  it('deve listar respostas com dados de usuario', async () => {
    queryBuilder.getMany.mockResolvedValue([{ id: 1 }])

    const result = await service.findAll()

    expect(result).toEqual([{ id: 1 }])
    expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith('studentAnswer.user', 'user')
  })

  it('deve remover resposta existente', async () => {
    mockRepository.findOneBy.mockResolvedValue({ id: 1 })
    mockRepository.remove.mockResolvedValue({ id: 1 })

    const result = await service.remove(1)

    expect(result).toEqual({ id: 1 })
  })

  it('deve falhar ao remover resposta inexistente', async () => {
    mockRepository.findOneBy.mockResolvedValue(null)

    await expect(service.remove(1)).rejects.toThrow(NotFoundException)
  })
})
