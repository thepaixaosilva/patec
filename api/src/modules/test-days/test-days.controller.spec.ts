import { Test, TestingModule } from '@nestjs/testing'
import { TestDaysController } from './test-days.controller'
import { TestDaysService } from './test-days.service'
import { NotFoundException, StreamableFile } from '@nestjs/common'
import * as fs from 'fs'
import { Readable } from 'stream'
import { AuthGuard } from 'src/guards/auth.guard'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'

describe('TestDaysController', () => {
  let controller: TestDaysController

  const mockTestDaysService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findOneByDate: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestDaysController],
      providers: [
        { provide: TestDaysService, useValue: mockTestDaysService },
        { provide: AuthGuard, useValue: { canActivate: jest.fn().mockReturnValue(true) } },
        { provide: JwtService, useValue: { verify: jest.fn() } },
        { provide: Reflector, useValue: { get: jest.fn(), getAllAndOverride: jest.fn() } },
      ],
    }).compile()

    controller = module.get<TestDaysController>(TestDaysController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('deve criar avaliacao e derivar nome do arquivo', async () => {
    const dto = { testDate: '2026-03-19', testType: 'MIDTERM' }
    mockTestDaysService.create.mockResolvedValue({ id: 1, ...dto, filePath: 'proof.pdf' })

    const result = await controller.create(dto as any, { path: 'dist/uploads/test-days/proof.pdf' } as any)

    expect(result).toEqual({ id: 1, ...dto, filePath: 'proof.pdf' })
    expect(mockTestDaysService.create).toHaveBeenCalledWith(expect.objectContaining({ filePath: 'proof.pdf' }))
  })

  it('deve listar avaliacoes', async () => {
    mockTestDaysService.findAll.mockResolvedValue([{ id: 1 }])

    const result = await controller.findAll()
    expect(result).toEqual([{ id: 1 }])
  })

  it('deve buscar avaliacao por id convertendo para numero', async () => {
    mockTestDaysService.findOne.mockResolvedValue({ id: 12 })

    const result = await controller.findOne('12')

    expect(result).toEqual({ id: 12 })
    expect(mockTestDaysService.findOne).toHaveBeenCalledWith(12)
  })

  it('deve retornar pdf quando arquivo existir', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true)
    jest.spyOn(fs, 'createReadStream').mockReturnValue(Readable.from(['pdf']) as any)

    const res = { set: jest.fn() } as any
    const result = controller.getPdf('proof.pdf', res)

    expect(res.set).toHaveBeenCalled()
    expect(result).toBeInstanceOf(StreamableFile)
  })

  it('deve falhar quando pdf nao existir', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false)

    expect(() => controller.getPdf('missing.pdf', { set: jest.fn() } as any)).toThrow(NotFoundException)
  })
})
