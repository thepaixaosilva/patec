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
   * @param password - User's password
   * @returns Promise with access token
   * @throws UnauthorizedException if credentials are invalid
   */
  async signIn(email: string, password: string): Promise<{ token: string }> {
    const user = await this.usersService.findOneByEmail(email)
    if (!user) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const payload = { id: user.id, name: user.name, ra: user.ra, email: user.email, role: user.role }
    return {
      token: await this.jwtService.signAsync(payload),
    }
  }
}
