import { Test, TestingModule } from '@nestjs/testing'
import { UserSubjectController } from './user-subject.controller'
import { UserSubjectService } from './user-subject.service'
import { AuthGuard } from 'src/guards/auth.guard'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'

jest.mock('multer', () =>
  jest.fn(() => ({
    single: jest.fn(() => (_req: any, _res: any, cb: (error?: any) => void) => cb()),
  }))
)

const multerMock = jest.requireMock('multer') as jest.Mock

describe('UserSubjectController', () => {
  let controller: UserSubjectController

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findAllByUserRa: jest.fn(),
    findAllBySubjectId: jest.fn(),
    remove: jest.fn(),
    processCsv: jest.fn(),
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSubjectController],
      providers: [
        { provide: UserSubjectService, useValue: mockService },
        { provide: AuthGuard, useValue: { canActivate: jest.fn().mockReturnValue(true) } },
        { provide: JwtService, useValue: { verify: jest.fn() } },
        { provide: Reflector, useValue: { get: jest.fn(), getAllAndOverride: jest.fn() } },
      ],
    }).compile()

    controller = module.get<UserSubjectController>(UserSubjectController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('deve criar matricula manual', async () => {
    const dto = { userId: 1, userRa: '1234567890123', subjectId: 'ADM0000' }
    mockService.create.mockResolvedValue(dto)

    const result = await controller.create(dto)

    expect(result).toEqual(dto)
    expect(mockService.create).toHaveBeenCalledWith(dto)
  })

  it('deve listar matriculas', async () => {
    mockService.findAll.mockResolvedValue([{ id: 1 }])

    const result = await controller.findAll()

    expect(result).toEqual([{ id: 1 }])
  })

  it('deve listar matriculas por disciplina', async () => {
    mockService.findAllBySubjectId.mockResolvedValue([{ subjectId: 'ADM0000' }])

    const result = await controller.findAllBySubjectId('ADM0000')

    expect(result).toEqual([{ subjectId: 'ADM0000' }])
    expect(mockService.findAllBySubjectId).toHaveBeenCalledWith('ADM0000')
  })

  it('deve remover matricula', async () => {
    mockService.remove.mockResolvedValue(undefined)

    await controller.remove('ADM0000', '1234567890123')

    expect(mockService.remove).toHaveBeenCalledWith('ADM0000', '1234567890123')
  })

  it('deve processar upload csv com sucesso', async () => {
    mockService.processCsv.mockResolvedValue(undefined)

    const req = { file: { path: '/tmp/users.csv' } }
    const status = jest.fn().mockReturnThis()
    const send = jest.fn().mockReturnThis()
    const res = { status, send }

    await controller.uploadCsv(req as any, res as any, 'ADM0000')

    expect(mockService.processCsv).toHaveBeenCalledWith('/tmp/users.csv', 'ADM0000')
    expect(status).toHaveBeenCalledWith(201)
  })

  it('deve retornar 400 quando upload falhar', async () => {
    multerMock.mockImplementationOnce(() => ({
      single: jest.fn(() => (_req: any, _res: any, cb: (error?: any) => void) => cb(new Error('upload failed'))),
    }))

    const req = {}
    const status = jest.fn().mockReturnThis()
    const send = jest.fn().mockReturnThis()
    const res = { status, send }

    await controller.uploadCsv(req as any, res as any, 'ADM0000')

    expect(status).toHaveBeenCalledWith(400)
    expect(send).toHaveBeenCalledWith(expect.objectContaining({ message: 'File upload failed' }))
  })

  it('deve retornar 500 quando processamento do csv falhar', async () => {
    mockService.processCsv.mockRejectedValue(new Error('csv parse failed'))

    const req = { file: { path: '/tmp/users.csv' } }
    const status = jest.fn().mockReturnThis()
    const send = jest.fn().mockReturnThis()
    const res = { status, send }

    await controller.uploadCsv(req as any, res as any, 'ADM0000')

    expect(status).toHaveBeenCalledWith(500)
    expect(send).toHaveBeenCalledWith(expect.objectContaining({ message: 'Error processing CSV' }))
  })
})
