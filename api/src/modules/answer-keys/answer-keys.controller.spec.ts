import { Test, TestingModule } from '@nestjs/testing'
import { AnswerKeysController } from './answer-keys.controller'
import { AnswerKeysService } from './answer-keys.service'
import { AuthGuard } from 'src/guards/auth.guard'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'

describe('AnswerKeysController', () => {
  let controller: AnswerKeysController

  const mockAnswerKeysService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerKeysController],
      providers: [
        { provide: AnswerKeysService, useValue: mockAnswerKeysService },
        { provide: AuthGuard, useValue: { canActivate: jest.fn().mockReturnValue(true) } },
        { provide: JwtService, useValue: { verify: jest.fn() } },
        { provide: Reflector, useValue: { get: jest.fn(), getAllAndOverride: jest.fn() } },
      ],
    }).compile()

    controller = module.get<AnswerKeysController>(AnswerKeysController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('deve criar gabarito', async () => {
    const dto = {
      answer1: 'A',
      answer2: 'B',
      answer3: 'C',
      answer4: 'D',
      answer5: 'E',
      testDayId: 1,
      subjectId: 'ADM0000',
    }
    mockAnswerKeysService.create.mockResolvedValue({ id: 1, ...dto })

    const result = await controller.create(dto)

    expect(result).toEqual({ id: 1, ...dto })
    expect(mockAnswerKeysService.create).toHaveBeenCalledWith(dto)
  })

  it('deve listar gabaritos', async () => {
    mockAnswerKeysService.findAll.mockResolvedValue([{ id: 1 }])

    const result = await controller.findAll()

    expect(result).toEqual([{ id: 1 }])
  })

  it('deve buscar um gabarito por id', async () => {
    mockAnswerKeysService.findOne.mockResolvedValue({ id: 2 })

    const result = await controller.findOne(2)

    expect(result).toEqual({ id: 2 })
    expect(mockAnswerKeysService.findOne).toHaveBeenCalledWith(2)
  })

  it('deve atualizar um gabarito', async () => {
    mockAnswerKeysService.update.mockResolvedValue({ id: 1, answer1: 'E' })

    const result = await controller.update(1, { answer1: 'E' })

    expect(result).toEqual({ id: 1, answer1: 'E' })
    expect(mockAnswerKeysService.update).toHaveBeenCalledWith(1, { answer1: 'E' })
  })

  it('deve remover um gabarito', async () => {
    mockAnswerKeysService.remove.mockResolvedValue(undefined)

    const result = await controller.remove(1)

    expect(result).toBeUndefined()
    expect(mockAnswerKeysService.remove).toHaveBeenCalledWith(1)
  })
})
