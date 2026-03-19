import { Test, TestingModule } from '@nestjs/testing'
import { SubjectsController } from './subjects.controller'
import { SubjectsService } from './subjects.service'
import { AuthGuard } from 'src/guards/auth.guard'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'

describe('SubjectsController', () => {
  let controller: SubjectsController

  const mockSubjectsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectsController],
      providers: [
        { provide: SubjectsService, useValue: mockSubjectsService },
        { provide: AuthGuard, useValue: { canActivate: jest.fn().mockReturnValue(true) } },
        { provide: JwtService, useValue: { verify: jest.fn() } },
        { provide: Reflector, useValue: { get: jest.fn(), getAllAndOverride: jest.fn() } },
      ],
    }).compile()

    controller = module.get<SubjectsController>(SubjectsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('deve criar disciplina', async () => {
    const dto = { subjectId: 'ADM0000', name: 'Admin', semester: 1 }
    mockSubjectsService.create.mockResolvedValue(dto)

    const result = await controller.create(dto as any)

    expect(result).toEqual(dto)
    expect(mockSubjectsService.create).toHaveBeenCalledWith(dto)
  })

  it('deve listar disciplinas', async () => {
    mockSubjectsService.findAll.mockResolvedValue([{ subjectId: 'ADM0000' }])

    const result = await controller.findAll()
    expect(result).toEqual([{ subjectId: 'ADM0000' }])
  })

  it('deve buscar disciplina por id', async () => {
    mockSubjectsService.findOne.mockResolvedValue({ subjectId: 'ADM0000' })

    const result = await controller.findOne('ADM0000')

    expect(result).toEqual({ subjectId: 'ADM0000' })
    expect(mockSubjectsService.findOne).toHaveBeenCalledWith('ADM0000')
  })

  it('deve atualizar disciplina', async () => {
    mockSubjectsService.update.mockResolvedValue({ subjectId: 'ADM0000', name: 'Novo nome' })

    const result = await controller.update('ADM0000', { name: 'Novo nome' } as any)

    expect(result).toEqual({ subjectId: 'ADM0000', name: 'Novo nome' })
  })

  it('deve remover disciplina', async () => {
    mockSubjectsService.remove.mockResolvedValue({ subjectId: 'ADM0000' })

    const result = await controller.remove('ADM0000')

    expect(result).toEqual({ subjectId: 'ADM0000' })
    expect(mockSubjectsService.remove).toHaveBeenCalledWith('ADM0000')
  })
})
