import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from 'src/modules/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

jest.mock('bcrypt')

describe('AuthService', () => {
  let service: AuthService

  const mockUsersService = {
    findOneByEmail: jest.fn(),
  }

  const mockJwtService = {
    signAsync: jest.fn(),
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('signIn', () => {
    it('deve autenticar e retornar token', async () => {
      mockUsersService.findOneByEmail.mockResolvedValue({
        id: 1,
        name: 'Aluno',
        ra: '1234567890123',
        email: 'aluno@example.com',
        role: 'student',
        password: 'hashed',
      })
        ; (bcrypt.compare as jest.Mock).mockResolvedValue(true)
      mockJwtService.signAsync.mockResolvedValue('jwt-token')

      const result = await service.signIn('aluno@example.com', '123456')

      expect(result).toEqual({ token: 'jwt-token' })
      expect(mockJwtService.signAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          email: 'aluno@example.com',
          role: 'student',
        })
      )
    })

    it('deve falhar quando usuario nao existe', async () => {
      mockUsersService.findOneByEmail.mockResolvedValue(null)

      await expect(service.signIn('missing@example.com', '123')).rejects.toThrow(UnauthorizedException)
    })

    it('deve falhar quando senha estiver incorreta', async () => {
      mockUsersService.findOneByEmail.mockResolvedValue({ id: 1, password: 'hashed' })
        ; (bcrypt.compare as jest.Mock).mockResolvedValue(false)

      await expect(service.signIn('aluno@example.com', 'wrong')).rejects.toThrow(UnauthorizedException)
    })
  })
})
