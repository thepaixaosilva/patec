import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

jest.mock('bcrypt')

describe('UsersService', () => {
  let service: UsersService

  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    role: 'student',
    password: 'hashedPassword',
    ra: '1234567890123',
    userSubject: [],
    answers: [],
  }

  const mockRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    jest.clearAllMocks()
    ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword')

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
      ra: '1234567890123',
    }

    it('should create a user successfully', async () => {
      mockRepository.findOneBy.mockResolvedValueOnce(null).mockResolvedValueOnce(null)
      mockRepository.save.mockResolvedValue(mockUser)

      const result = await service.create(createUserDto as any)

      expect(result).toEqual(expect.objectContaining({ name: 'Test User', email: 'test@example.com' }))
      expect(bcrypt.hash).toHaveBeenCalledWith('Test123!', 10)
    })

    it('should throw ConflictException when email already exists', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockUser)

      await expect(service.create(createUserDto as any)).rejects.toThrow(ConflictException)
    })

    it('should throw ConflictException when ra already exists', async () => {
      mockRepository.findOneBy.mockResolvedValueOnce(null).mockResolvedValueOnce({ ...mockUser, email: 'other@example.com' })

      await expect(service.create(createUserDto as any)).rejects.toThrow(ConflictException)
    })

    it('should wrap unexpected errors while creating', async () => {
      mockRepository.findOneBy.mockResolvedValueOnce(null).mockResolvedValueOnce(null)
      mockRepository.save.mockRejectedValue(new Error('db offline'))

      await expect(service.create(createUserDto as any)).rejects.toThrow(InternalServerErrorException)
    })
  })

  describe('findAll', () => {
    it('should return an array of users', async () => {
      mockRepository.find.mockResolvedValue([mockUser])

      const result = await service.findAll()

      expect(result).toEqual([mockUser])
      expect(mockRepository.find).toHaveBeenCalled()
    })
  })

  describe('findOne', () => {
    it('should return a user by ra', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser)

      const result = await service.findOne('1234567890123')

      expect(result).toEqual(mockUser)
    })

    it('should throw NotFoundException when user not found', async () => {
      mockRepository.findOne.mockResolvedValue(null)

      await expect(service.findOne('1234567890123')).rejects.toThrow(NotFoundException)
    })
  })

  describe('update', () => {
    it('should update a user successfully', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockUser)
      mockRepository.save.mockResolvedValue({ ...mockUser, name: 'Updated User' })

      const result = await service.update('1234567890123', { name: 'Updated User' } as any)

      expect(result).toEqual(expect.objectContaining({ name: 'Updated User' }))
    })

    it('should throw NotFoundException when user not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null)

      await expect(service.update('1234567890123', { name: 'Updated User' } as any)).rejects.toThrow(NotFoundException)
    })

    it('should hash password when updating password', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockUser)
      mockRepository.save.mockResolvedValue(mockUser)

      await service.update('1234567890123', { password: 'newPassword' } as any)

      expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', 10)
    })

    it('should throw ConflictException when updating email to one already in use', async () => {
      mockRepository.findOneBy.mockResolvedValueOnce(mockUser).mockResolvedValueOnce({ ...mockUser, ra: '9999999999999' })

      await expect(service.update('1234567890123', { email: 'existing@example.com' } as any)).rejects.toThrow(ConflictException)
    })

    it('should wrap unexpected errors while updating', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockUser)
      mockRepository.save.mockRejectedValue(new Error('db timeout'))

      await expect(service.update('1234567890123', { name: 'Updated User' } as any)).rejects.toThrow(InternalServerErrorException)
    })
  })

  describe('remove', () => {
    it('should remove a user successfully', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockUser)
      mockRepository.remove.mockResolvedValue(mockUser)

      await service.remove('1234567890123')

      expect(mockRepository.remove).toHaveBeenCalledWith(mockUser)
    })

    it('should throw NotFoundException when user not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null)

      await expect(service.remove('1234567890123')).rejects.toThrow(NotFoundException)
    })

    it('should wrap unexpected errors while removing', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockUser)
      mockRepository.remove.mockRejectedValue(new Error('constraint failed'))

      await expect(service.remove('1234567890123')).rejects.toThrow(InternalServerErrorException)
    })
  })
})
