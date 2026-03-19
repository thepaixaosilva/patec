import { Test, TestingModule } from '@nestjs/testing'
import { SubjectsService } from './subjects.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Subject } from './entities/subject.entity'
import { ConflictException, NotFoundException } from '@nestjs/common'

describe('SubjectsService', () => {
  let service: SubjectsService

  const mockRepository = {
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    merge: jest.fn(),
    remove: jest.fn(),
    findOne: jest.fn(),
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectsService,
        { provide: getRepositoryToken(Subject), useValue: mockRepository },
      ],
    }).compile()

    service = module.get<SubjectsService>(SubjectsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('deve criar disciplina quando codigo for novo', async () => {
    const dto = { subjectId: 'ADM0000', name: 'Admin', semester: 1 }
    mockRepository.findOneBy.mockResolvedValue(null)
    mockRepository.create.mockReturnValue(dto)
    mockRepository.save.mockResolvedValue(dto)

    const result = await service.create(dto as any)

    expect(result).toEqual(dto)
  })

  it('deve falhar ao criar disciplina duplicada', async () => {
    mockRepository.findOneBy.mockResolvedValue({ subjectId: 'ADM0000' })

    await expect(service.create({ subjectId: 'ADM0000' } as any)).rejects.toThrow(ConflictException)
  })

  it('deve buscar disciplina existente', async () => {
    mockRepository.findOneBy.mockResolvedValue({ subjectId: 'ADM0000' })

    const result = await service.findOne('ADM0000')
    expect(result).toEqual({ subjectId: 'ADM0000' })
  })

  it('deve falhar ao buscar disciplina inexistente', async () => {
    mockRepository.findOneBy.mockResolvedValue(null)

    await expect(service.findOne('ADM0000')).rejects.toThrow(NotFoundException)
  })

  it('deve atualizar disciplina existente', async () => {
    const existing = { subjectId: 'ADM0000', name: 'Antigo' }
    mockRepository.findOneBy.mockResolvedValue(existing)
    mockRepository.save.mockResolvedValue({ ...existing, name: 'Novo' })

    const result = await service.update('ADM0000', { name: 'Novo' })

    expect(result).toEqual({ subjectId: 'ADM0000', name: 'Novo' })
    expect(mockRepository.merge).toHaveBeenCalledWith(existing, { name: 'Novo' })
  })

  it('deve falhar ao atualizar disciplina inexistente', async () => {
    mockRepository.findOneBy.mockResolvedValue(null)

    await expect(service.update('ADM0000', { name: 'Novo' })).rejects.toThrow(NotFoundException)
  })

  it('deve remover disciplina existente', async () => {
    const existing = { subjectId: 'ADM0000' }
    mockRepository.findOneBy.mockResolvedValue(existing)
    mockRepository.remove.mockResolvedValue(existing)

    const result = await service.remove('ADM0000')

    expect(result).toEqual(existing)
  })

  it('deve falhar ao remover disciplina inexistente', async () => {
    mockRepository.findOneBy.mockResolvedValue(null)

    await expect(service.remove('ADM0000')).rejects.toThrow(NotFoundException)
  })

  it('deve buscar disciplina com relacoes', async () => {
    const subjectWithRelations = { subjectId: 'ADM0000', userSubject: [], answerKeys: [] }
    mockRepository.findOne.mockResolvedValue(subjectWithRelations)

    const result = await service.findOneWithRelations('ADM0000')

    expect(result).toEqual(subjectWithRelations)
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { subjectId: 'ADM0000' }, relations: ['userSubject', 'answerKeys'] })
  })

  it('deve falhar ao buscar disciplina com relacoes quando nao existe', async () => {
    mockRepository.findOne.mockResolvedValue(null)

    await expect(service.findOneWithRelations('ADM0000')).rejects.toThrow(NotFoundException)
  })

  it('deve filtrar disciplinas por semestre', async () => {
    mockRepository.find.mockResolvedValue([{ subjectId: 'ADM0000' }])

    const result = await service.findBySemester(1)

    expect(result).toEqual([{ subjectId: 'ADM0000' }])
    expect(mockRepository.find).toHaveBeenCalledWith({ where: { semester: 1 }, order: { name: 'ASC' } })
  })
})
