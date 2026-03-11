import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ConflictException, NotFoundException } from '@nestjs/common'

describe('UsersController', () => {
  let controller: UsersController
  let service: UsersService

  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    role: 'student',
    ra: '12345',
    rf: null,
    userSubject: [],
    answers: [],
  }

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile()

    controller = module.get<UsersController>(UsersController)
    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    const createUserDto: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'student',
      password: 'Test123!',
    }

    it('should create a user successfully', async () => {
      mockUsersService.create.mockResolvedValue(mockUser)

      const result = await controller.create(createUserDto)

      expect(result).toEqual(mockUser)
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto)
    })

    it('should throw ConflictException when email already exists', async () => {
      mockUsersService.create.mockRejectedValue(new ConflictException('Email já está em uso'))

      await expect(controller.create(createUserDto)).rejects.toThrow(ConflictException)
    })
  })

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [mockUser]
      mockUsersService.findAll.mockResolvedValue(users)

      const result = await controller.findAll()

      expect(result).toEqual(users)
      expect(mockUsersService.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne', () => {
    it('should return a user by id', async () => {
      mockUsersService.findOne.mockResolvedValue(mockUser)

      const result = await controller.findOne(1)

      expect(result).toEqual(mockUser)
      expect(mockUsersService.findOne).toHaveBeenCalledWith(1)
    })

    it('should throw NotFoundException when user not found', async () => {
      mockUsersService.findOne.mockRejectedValue(new NotFoundException('Usuário não encontrado'))

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException)
    })
  })

  describe('update', () => {
    const updateUserDto: UpdateUserDto = {
      name: 'Updated User',
    }

    it('should update a user successfully', async () => {
      const updatedUser = { ...mockUser, ...updateUserDto }
      mockUsersService.update.mockResolvedValue(updatedUser)

      const result = await controller.update(1, updateUserDto)

      expect(result).toEqual(updatedUser)
      expect(mockUsersService.update).toHaveBeenCalledWith(1, updateUserDto)
    })

    it('should throw NotFoundException when user not found', async () => {
      mockUsersService.update.mockRejectedValue(new NotFoundException('Usuário não encontrado'))

      await expect(controller.update(1, updateUserDto)).rejects.toThrow(NotFoundException)
    })
  })

  describe('remove', () => {
    it('should remove a user successfully', async () => {
      mockUsersService.remove.mockResolvedValue(undefined)

      const result = await controller.remove(1)

      expect(result).toBeUndefined()
      expect(mockUsersService.remove).toHaveBeenCalledWith(1)
    })

    it('should throw NotFoundException when user not found', async () => {
      mockUsersService.remove.mockRejectedValue(new NotFoundException('Usuário não encontrado'))

      await expect(controller.remove(1)).rejects.toThrow(NotFoundException)
    })
  })
})
