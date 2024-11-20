import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Verifica se a rota ou o controlador foi marcado como público
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler())
    if (isPublic) {
      return true // Permitir acesso sem autenticação
    }

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException('Token não encontrado no cabeçalho')
    }

    try {
      const payload = await this.jwtService.verify(token, {
        secret: `ecq/2B"/#8rC~3&FA1h@A24$pQ(Tp^oJCR+Lq%[Rp;;sa[,Zq9Z>?YK"Q9uw%/-mo99bp@:GE8Pif%0~z]tpf9/Y}|Tdn{|]"_0H`,
      })

      request['user'] = payload // Armazena os dados do usuário na requisição
    } catch (e) {
      console.error('Erro na verificação do JWT:', e)
      throw new UnauthorizedException('Token inválido ou expirado')
    }

    return true // Permitir acesso
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
