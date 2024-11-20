import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '../guards/auth.guard'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/sign-in.dto'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UsersService } from 'src/users/users.service'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({
    summary: 'User authentication',
    description: 'Authenticates a user using email and password credentials.',
  })
  @ApiBody({
    type: SignInDto,
    description: 'User credentials',
    examples: {
      credentials: {
        value: {
          email: 'user@example.com',
          password: '********',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully authenticated',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password)
  }

  @UseGuards(AuthGuard)
  @Get('role')
  @ApiOperation({
    summary: 'Get user role',
    description: 'Retrieves the role of the authenticated user.',
  })
  @ApiResponse({
    status: 200,
    description: 'User role retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing token',
  })
  async getRole(@Request() req) {
    const user = await this.usersService.findOneById(req.user.sub)
    return { role: user.role }
  }
}
