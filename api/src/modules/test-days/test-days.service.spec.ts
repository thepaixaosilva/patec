import { Test, TestingModule } from '@nestjs/testing'
import { TestDaysService } from './test-days.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { TestDay } from './entities/test-day.entity'
import { BadRequestException, NotFoundException } from '@nestjs/common'

describe('TestDaysService', () => {
  let service: TestDaysService

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    merge: jest.fn(),
    remove: jest.fn(),
    findOne: jest.fn(),
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestDaysService,
        { provide: getRepositoryToken(TestDay), useValue: mockRepository },
      ],
    }).compile()

    service = module.get<TestDaysService>(TestDaysService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('deve criar avaliacao', async () => {
    const dto = { testDate: '2026-03-19', testType: 'MIDTERM' }
    mockRepository.create.mockReturnValue(dto)
    mockRepository.save.mockResolvedValue({ id: 1, ...dto })

    const result = await service.create(dto as any)

    expect(result).toEqual({ id: 1, ...dto })
  })

  it('deve listar avaliacoes ordenadas por data desc', async () => {
    mockRepository.find.mockResolvedValue([{ id: 1 }])

    const result = await service.findAll()

    expect(result).toEqual([{ id: 1 }])
    expect(mockRepository.find).toHaveBeenCalledWith({ order: { testDate: 'DESC' } })
  })

  it('deve validar formato de data em findOneByDate', async () => {
    await expect(service.findOneByDate('19-03-2026')).rejects.toThrow(BadRequestException)
  })

  it('deve falhar ao buscar por data inexistente', async () => {
    mockRepository.findOneBy.mockResolvedValue(null)

    await expect(service.findOneByDate('2026-03-19')).rejects.toThrow(NotFoundException)
  })

  it('deve atualizar avaliacao existente', async () => {
    const existing = { id: 1, testType: 'MIDTERM' }
    mockRepository.findOneBy.mockResolvedValue(existing)
    mockRepository.save.mockResolvedValue({ id: 1, testType: 'FINAL' })

    const result = await service.update(1, { testType: 'FINAL' } as any)

    expect(result).toEqual({ id: 1, testType: 'FINAL' })
    expect(mockRepository.merge).toHaveBeenCalledWith(existing, { testType: 'FINAL' })
  })

  it('deve remover avaliacao existente', async () => {
    const existing = { id: 1 }
    mockRepository.findOneBy.mockResolvedValue(existing)
    mockRepository.remove.mockResolvedValue(existing)

    const result = await service.remove(1)

    expect(result).toEqual(existing)
  })
})
