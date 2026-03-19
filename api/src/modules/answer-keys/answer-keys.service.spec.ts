import { Test, TestingModule } from '@nestjs/testing'
import { AnswerKeysService } from './answer-keys.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { AnswerKey } from './entities/answer-key.entity'
import { TestDay } from 'src/modules/test-days/entities/test-day.entity'
import { Subject } from 'src/modules/subjects/entities/subject.entity'
import { NotFoundException } from '@nestjs/common'
import { format } from 'date-fns'

describe('AnswerKeysService', () => {
  let service: AnswerKeysService

  const queryBuilder = {
    innerJoinAndSelect: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  }

  const mockAnswerKeyRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    merge: jest.fn(),
    createQueryBuilder: jest.fn(() => queryBuilder),
  }

  const mockTestDayRepository = {
    findOne: jest.fn(),
  }

  const mockSubjectRepository = {
    findOne: jest.fn(),
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswerKeysService,
        { provide: getRepositoryToken(AnswerKey), useValue: mockAnswerKeyRepository },
        { provide: getRepositoryToken(TestDay), useValue: mockTestDayRepository },
        { provide: getRepositoryToken(Subject), useValue: mockSubjectRepository },
      ],
    }).compile()

    service = module.get<AnswerKeysService>(AnswerKeysService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('deve criar gabarito relacionando avaliacao e disciplina', async () => {
    const dto = {
      answer1: 'A',
      answer2: 'B',
      answer3: 'C',
      answer4: 'D',
      answer5: 'E',
      testDayId: 10,
      subjectId: 'ADM0000',
    }

    mockTestDayRepository.findOne.mockResolvedValue({ id: 10 })
    mockSubjectRepository.findOne.mockResolvedValue({ subjectId: 'ADM0000' })
    mockAnswerKeyRepository.save.mockImplementation(async (entity) => ({ id: 1, ...entity }))

    const result = await service.create(dto as any)

    expect(result).toEqual(expect.objectContaining({ id: 1, answer1: 'A' }))
    expect(mockTestDayRepository.findOne).toHaveBeenCalledWith({ where: { id: 10 } })
    expect(mockSubjectRepository.findOne).toHaveBeenCalledWith({ where: { subjectId: 'ADM0000' } })
  })

  it('deve buscar por disciplina e data formatada', async () => {
    queryBuilder.getMany.mockResolvedValue([{ id: 7 }])
    const expectedDate = format(new Date('19-03-2026'.split('-').reverse().join('-')), 'yyyy-MM-dd')

    const result = await service.search('ADM0000', '19-03-2026')

    expect(result).toEqual([{ id: 7 }])
    expect(queryBuilder.where).toHaveBeenCalledWith('subject.subjectId = :subjectId', { subjectId: 'ADM0000' })
    expect(queryBuilder.andWhere).toHaveBeenCalledWith('DATE(testDay.testDate) = :testDate', { testDate: expectedDate })
  })

  it('deve atualizar um gabarito existente', async () => {
    const existing = { id: 5, answer1: 'A' }
    mockAnswerKeyRepository.findOneBy.mockResolvedValue(existing)
    mockAnswerKeyRepository.save.mockResolvedValue({ ...existing, answer1: 'E' })

    const result = await service.update(5, { answer1: 'E' } as any)

    expect(result).toEqual({ id: 5, answer1: 'E' })
    expect(mockAnswerKeyRepository.merge).toHaveBeenCalledWith(existing, { answer1: 'E' })
  })

  it('deve falhar ao atualizar gabarito inexistente', async () => {
    mockAnswerKeyRepository.findOneBy.mockResolvedValue(null)

    await expect(service.update(5, { answer1: 'E' } as any)).rejects.toThrow(NotFoundException)
  })

  it('deve remover gabarito existente', async () => {
    const existing = { id: 3 }
    mockAnswerKeyRepository.findOneBy.mockResolvedValue(existing)
    mockAnswerKeyRepository.remove.mockResolvedValue(existing)

    const result = await service.remove(3)

    expect(result).toEqual(existing)
    expect(mockAnswerKeyRepository.remove).toHaveBeenCalledWith(existing)
  })

  it('deve falhar ao remover gabarito inexistente', async () => {
    mockAnswerKeyRepository.findOneBy.mockResolvedValue(null)

    await expect(service.remove(99)).rejects.toThrow(NotFoundException)
  })
})
