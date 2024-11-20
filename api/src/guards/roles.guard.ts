import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from 'src/decorators/roles.decorator'
import { Role } from 'src/enums/roles.enum'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

    if (!requiredRoles) {
      return true
    }

    let { user } = context.switchToHttp().getRequest()
    user = await this.usersService.findOneById(user.sub)

    if (!user?.role) {
      return false
    }

    if (user.role.includes(requiredRoles)) {
      return true
    }

    return requiredRoles.some((role) => user.roles.includes(role))
  }
}
