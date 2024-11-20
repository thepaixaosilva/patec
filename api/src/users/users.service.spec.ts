import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { ConflictException, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

jest.mock('bcrypt')

describe('UsersService', () => {
  let service: UsersService
  let repository: Repository<User>

  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    role: 'student',
    password: 'hashedPassword',
    ra: '12345',
    rf: null,
    userSubject: [],
    answers: [],
  }

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
    merge: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
    repository = module.get<Repository<User>>(getRepositoryToken(User))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    const createUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'student',
      password: 'Test123!',
    }

    beforeEach(() => {
      ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword')
    })

    it('should create a user successfully', async () => {
      mockRepository.findOneBy.mockResolvedValue(null)
      mockRepository.create.mockReturnValue({ ...createUserDto })
      mockRepository.save.mockResolvedValue(mockUser)

      const result = await service.create(createUserDto)

      expect(result).toEqual(
        expect.objectContaining({
          name: createUserDto.name,
          email: createUserDto.email,
        })
      )
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10)
    })

    it('should throw ConflictException when email already exists', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockUser)

      await expect(service.create(createUserDto)).rejects.toThrow(ConflictException)
    })
  })

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [mockUser]
      mockRepository.find.mockResolvedValue(users)

      const result = await service.findAll()

      expect(result).toEqual(users)
      expect(repository.find).toHaveBeenCalled()
    })
  })

  describe('findOne', () => {
    it('should return a user by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser)

      const result = await service.findOne(1)

      expect(result).toEqual(mockUser)
    })

    it('should throw NotFoundException when user not found', async () => {
      mockRepository.findOne.mockResolvedValue(null)

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException)
    })
  })

  describe('update', () => {
    const updateUserDto = {
      name: 'Updated User',
    }

    it('should update a user successfully', async () => {
      const updatedUser = { ...mockUser, ...updateUserDto }
      mockRepository.findOneBy.mockResolvedValue(mockUser)
      mockRepository.save.mockResolvedValue(updatedUser)

      const result = await service.update(1, updateUserDto)

      expect(result).toEqual(
        expect.objectContaining({
          name: updateUserDto.name,
        })
      )
    })

    it('should throw NotFoundException when user not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null)

      await expect(service.update(1, updateUserDto)).rejects.toThrow(NotFoundException)
    })

    it('should hash password when updating password', async () => {
      const updateWithPassword = { ...updateUserDto, password: 'newPassword' }
      mockRepository.findOneBy.mockResolvedValue(mockUser)
      mockRepository.save.mockResolvedValue({ ...mockUser, ...updateWithPassword })

      await service.update(1, updateWithPassword)

      expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', 10)
    })
  })

  describe('remove', () => {
    it('should remove a user successfully', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockUser)
      mockRepository.remove.mockResolvedValue(mockUser)

      await service.remove(1)

      expect(repository.remove).toHaveBeenCalledWith(mockUser)
    })

    it('should throw NotFoundException when user not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null)

      await expect(service.remove(1)).rejects.toThrow(NotFoundException)
    })
  })
})
