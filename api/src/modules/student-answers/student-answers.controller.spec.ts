import { Test, TestingModule } from '@nestjs/testing'
import { StudentAnswersController } from './student-answers.controller'
import { StudentAnswersService } from './student-answers.service'
import { AuthGuard } from 'src/guards/auth.guard'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'

describe('StudentAnswersController', () => {
  let controller: StudentAnswersController

  const mockStudentAnswersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentAnswersController],
      providers: [
        { provide: StudentAnswersService, useValue: mockStudentAnswersService },
        { provide: AuthGuard, useValue: { canActivate: jest.fn().mockReturnValue(true) } },
        { provide: JwtService, useValue: { verify: jest.fn() } },
        { provide: Reflector, useValue: { get: jest.fn(), getAllAndOverride: jest.fn() } },
      ],
    }).compile()

    controller = module.get<StudentAnswersController>(StudentAnswersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('deve criar resposta de aluno', async () => {
    const dto = {
      answer1: 'A',
      answer2: 'B',
      answer3: 'C',
      answer4: 'D',
      answer5: 'E',
      user: { id: 1 },
      answerKey: { id: 10 },
      score: 0,
    }
    mockStudentAnswersService.create.mockResolvedValue({ id: 1, ...dto })

    const result = await controller.create('ADM0000', '19-03-2026', dto as any)

    expect(result).toEqual({ id: 1, ...dto })
    expect(mockStudentAnswersService.create).toHaveBeenCalledWith('ADM0000', '19-03-2026', dto)
  })

  it('deve listar respostas', async () => {
    mockStudentAnswersService.findAll.mockResolvedValue([{ id: 1 }])

    const result = await controller.findAll()
    expect(result).toEqual([{ id: 1 }])
  })

  it('deve buscar resposta por id', async () => {
    mockStudentAnswersService.findOne.mockResolvedValue({ id: 7 })

    const result = await controller.findOne(7)

    expect(result).toEqual({ id: 7 })
    expect(mockStudentAnswersService.findOne).toHaveBeenCalledWith(7)
  })

  it('deve remover resposta por id', async () => {
    mockStudentAnswersService.remove.mockResolvedValue(undefined)

    const result = await controller.remove(8)

    expect(result).toBeUndefined()
    expect(mockStudentAnswersService.remove).toHaveBeenCalledWith(8)
  })
})
