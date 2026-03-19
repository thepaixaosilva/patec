import { Test, TestingModule } from '@nestjs/testing'
import { UserSubjectService } from './user-subject.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserSubject } from './entities/user-subject.entity'
import { UsersService } from 'src/modules/users/users.service'
import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import * as fs from 'fs'
import { parse } from 'csv-parse/sync'

jest.mock('csv-parse/sync', () => ({ parse: jest.fn() }))

describe('UserSubjectService', () => {
  let service: UserSubjectService

  const mockRepository = {
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
  }

  const mockUsersService = {
    findOne: jest.fn(),
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserSubjectService,
        { provide: getRepositoryToken(UserSubject), useValue: mockRepository },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile()

    service = module.get<UserSubjectService>(UserSubjectService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('deve criar matricula quando nao houver duplicidade', async () => {
    const dto = { userId: 1, userRa: '1234567890123', subjectId: 'ADM0000' }
    mockRepository.findOneBy.mockResolvedValue(null)
    mockRepository.create.mockReturnValue(dto)
    mockRepository.save.mockResolvedValue(dto)

    const result = await service.create(dto)

    expect(result).toEqual(dto)
  })

  it('deve impedir matricula duplicada', async () => {
    mockRepository.findOneBy.mockResolvedValue({ userRa: '1234567890123', subjectId: 'ADM0000' })

    await expect(service.create({ userRa: '1234567890123', subjectId: 'ADM0000' } as any)).rejects.toThrow(ConflictException)
  })

  it('deve falhar ao remover matricula inexistente', async () => {
    mockRepository.findOneBy.mockResolvedValue(null)

    await expect(service.remove('ADM0000', '1234567890123')).rejects.toThrow(NotFoundException)
  })

  it('deve encapsular erro ao remover matricula existente', async () => {
    mockRepository.findOneBy.mockResolvedValue({ userRa: '1234567890123', subjectId: 'ADM0000' })
    mockRepository.remove.mockRejectedValue(new Error('remove failed'))

    await expect(service.remove('ADM0000', '1234567890123')).rejects.toThrow(InternalServerErrorException)
  })

  it('deve remover todas matriculas da disciplina', async () => {
    const list = [{ userRa: '1234567890123', subjectId: 'ADM0000' }]
    mockRepository.find.mockResolvedValue(list)
    mockRepository.remove.mockResolvedValue(undefined)

    await service.removeAllSubject('ADM0000')

    expect(mockRepository.find).toHaveBeenCalledWith({ where: { subjectId: 'ADM0000' } })
    expect(mockRepository.remove).toHaveBeenCalledWith(list)
  })

  it('deve processar csv e recriar matriculas da disciplina', async () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue('ra,name\n1234567890123,Ana\n5555555555555,Beto' as any)
    jest.spyOn(fs, 'unlinkSync').mockImplementation(() => undefined)
      ; (parse as jest.Mock).mockReturnValue([
        { ra: '1234567890123', name: 'Ana' },
        { ra: '5555555555555', name: 'Beto' },
      ])

    jest.spyOn(service, 'removeAllSubject').mockResolvedValue(undefined)
    mockUsersService.findOne.mockResolvedValueOnce({ id: 10, ra: '1234567890123' }).mockResolvedValueOnce({ id: 11, ra: '5555555555555' })
    mockRepository.save.mockResolvedValue(undefined)

    await service.processCsv('/tmp/students.csv', 'ADM0000')

    expect(service.removeAllSubject).toHaveBeenCalledWith('ADM0000')
    expect(mockUsersService.findOne).toHaveBeenNthCalledWith(1, '1234567890123')
    expect(mockUsersService.findOne).toHaveBeenNthCalledWith(2, '5555555555555')
    expect(mockRepository.save).toHaveBeenCalledTimes(2)
    expect(fs.unlinkSync).toHaveBeenCalledWith('/tmp/students.csv')
  })

  it('deve lançar erro interno quando salvar novos alunos falhar no processCsv', async () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue('ra,name\n1234567890123,Ana' as any)
    jest.spyOn(fs, 'unlinkSync').mockImplementation(() => undefined)
    ;(parse as jest.Mock).mockReturnValue([{ ra: '1234567890123', name: 'Ana' }])

    jest.spyOn(service, 'removeAllSubject').mockResolvedValue(undefined)
    mockUsersService.findOne.mockResolvedValue({ id: 10, ra: '1234567890123' })
    mockRepository.save.mockRejectedValue(new Error('save failed'))

    await expect(service.processCsv('/tmp/students.csv', 'ADM0000')).rejects.toThrow(InternalServerErrorException)
    expect(fs.unlinkSync).not.toHaveBeenCalled()
  })
})
