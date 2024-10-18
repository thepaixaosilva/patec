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

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email)
    const isMatch = await bcrypt.compare(pass, user.password)

    if (!isMatch) {
      throw new UnauthorizedException()
    }
    const payload = { sub: user.id, name: user.name }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
