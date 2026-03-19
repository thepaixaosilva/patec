import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersService } from 'src/modules/users/users.service'
import { AuthGuard } from 'src/guards/auth.guard'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'

describe('AuthController', () => {
  let controller: AuthController

  const mockAuthService = {
    signIn: jest.fn(),
  }

  const mockUsersService = {
    findOneById: jest.fn(),
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUsersService },
        { provide: AuthGuard, useValue: { canActivate: jest.fn().mockReturnValue(true) } },
        { provide: JwtService, useValue: { verify: jest.fn() } },
        { provide: Reflector, useValue: { get: jest.fn(), getAllAndOverride: jest.fn() } },
      ],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('signIn', () => {
    it('deve autenticar com email e senha', async () => {
      mockAuthService.signIn.mockResolvedValue({ token: 'jwt-token' })

      const result = await controller.signIn({ email: 'student@example.com', password: '123456' })

      expect(result).toEqual({ token: 'jwt-token' })
      expect(mockAuthService.signIn).toHaveBeenCalledWith('student@example.com', '123456')
    })
  })

  describe('getRole', () => {
    it('deve retornar o papel do usuario autenticado', async () => {
      mockUsersService.findOneById.mockResolvedValue({ id: 1, role: 'coordinator' })

      const result = await controller.getRole({ user: { sub: 1 } })

      expect(result).toEqual({ role: 'coordinator' })
      expect(mockUsersService.findOneById).toHaveBeenCalledWith(1)
    })
  })
})
