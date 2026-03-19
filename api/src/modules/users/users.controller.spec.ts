import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { ConflictException, NotFoundException } from '@nestjs/common'
import { AuthGuard } from 'src/guards/auth.guard'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'

describe('UsersController', () => {
  let controller: UsersController

  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    role: 'student',
    ra: '1234567890123',
    userSubject: [],
    answers: [],
  }

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findAllStudents: jest.fn(),
    findOne: jest.fn(),
    findOneById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: AuthGuard, useValue: { canActivate: jest.fn().mockReturnValue(true) } },
        { provide: JwtService, useValue: { verify: jest.fn() } },
        { provide: Reflector, useValue: { get: jest.fn(), getAllAndOverride: jest.fn() } },
      ],
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    const createUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'student',
      password: 'Test123!',
      ra: '1234567890123',
    }

    it('should create a user successfully', async () => {
      mockUsersService.create.mockResolvedValue(mockUser)

      const result = await controller.create(createUserDto)

      expect(result).toEqual(mockUser)
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto)
    })

    it('should throw ConflictException when email already exists', async () => {
      mockUsersService.create.mockRejectedValue(new ConflictException('Email ja esta em uso'))

      await expect(controller.create(createUserDto)).rejects.toThrow(ConflictException)
    })
  })

  describe('findAll', () => {
    it('should return an array of users', async () => {
      mockUsersService.findAll.mockResolvedValue([mockUser])

      const result = await controller.findAll()

      expect(result).toEqual([mockUser])
      expect(mockUsersService.findAll).toHaveBeenCalled()
    })
  })

  describe('findAllStudents', () => {
    it('should return only students', async () => {
      mockUsersService.findAllStudents.mockResolvedValue([mockUser])

      const result = await controller.findAllStudents()

      expect(result).toEqual([mockUser])
      expect(mockUsersService.findAllStudents).toHaveBeenCalled()
    })
  })

  describe('findOne', () => {
    it('should return a user by ra', async () => {
      mockUsersService.findOne.mockResolvedValue(mockUser)

      const result = await controller.findOne('1234567890123')

      expect(result).toEqual(mockUser)
      expect(mockUsersService.findOne).toHaveBeenCalledWith('1234567890123')
    })

    it('should throw NotFoundException when user not found', async () => {
      mockUsersService.findOne.mockRejectedValue(new NotFoundException('Usuario nao encontrado'))

      await expect(controller.findOne('1234567890123')).rejects.toThrow(NotFoundException)
    })
  })

  describe('findOneById', () => {
    it('should return a user by id', async () => {
      mockUsersService.findOneById.mockResolvedValue(mockUser)

      const result = await controller.findOneById(1)

      expect(result).toEqual(mockUser)
      expect(mockUsersService.findOneById).toHaveBeenCalledWith(1)
    })
  })

  describe('update', () => {
    it('should update a user successfully', async () => {
      const updatedUser = { ...mockUser, name: 'Updated User' }
      mockUsersService.update.mockResolvedValue(updatedUser)

      const result = await controller.update('1234567890123', { name: 'Updated User' })

      expect(result).toEqual(updatedUser)
      expect(mockUsersService.update).toHaveBeenCalledWith('1234567890123', { name: 'Updated User' })
    })
  })

  describe('remove', () => {
    it('should remove a user successfully', async () => {
      mockUsersService.remove.mockResolvedValue(undefined)

      const result = await controller.remove('1234567890123')

      expect(result).toBeUndefined()
      expect(mockUsersService.remove).toHaveBeenCalledWith('1234567890123')
    })
  })
})
