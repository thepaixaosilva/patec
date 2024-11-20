import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  /**
   * Authenticates a user and generates a JWT token
   * @param email - User's email
   * @param pass - User's password
   * @returns Promise with access token
   * @throws UnauthorizedException if credentials are invalid
   */
  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email)
    if (!user) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const isMatch = await bcrypt.compare(pass, user.password)
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const payload = { sub: user.id, name: user.name }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
