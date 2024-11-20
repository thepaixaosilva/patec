import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { AppModule } from '../app.module'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { Role } from '../enums/roles.enum'

interface AdminConfig {
  name: string
  email: string
  password: string
  role: Role
}

async function createAdmin(config: AdminConfig, userService: UsersService): Promise<void> {
  const logger = new Logger('AdminSeed')

  try {
    // Verifica se o usuário já existe
    const existingUser = await userService.findOneByEmail(config.email)

    if (existingUser) {
      logger.warn(`Usuário admin ${config.email} já existe. Pulando criação.`)
      return
    }

    const createUserDto: CreateUserDto = {
      name: config.name,
      email: config.email,
      password: config.password,
      role: config.role,
    }

    const user = await userService.create(createUserDto)
    logger.log(`Usuário admin criado com sucesso: ${user.email}`)
  } catch (error) {
    logger.error('Erro ao criar usuário admin:', error.message)
    throw error
  }
}

async function bootstrap() {
  const logger = new Logger('Bootstrap')

  try {
    logger.log('Iniciando criação do usuário admin...')

    const app = await NestFactory.createApplicationContext(AppModule)
    const userService = app.get(UsersService)

    const adminConfig: AdminConfig = {
      name: process.env.ADMIN_NAME || 'Admin Coordenador',
      email: process.env.ADMIN_EMAIL || 'coordenador@exemplo.com',
      password: process.env.ADMIN_PASSWORD || 'senhaSegura',
      role: Role.Coordinator,
    }

    await createAdmin(adminConfig, userService)

    await app.close()
    logger.log('Processo finalizado com sucesso.')
  } catch (error) {
    logger.error('Erro durante o processo de seed:', error.message)
    process.exit(1)
  }
}

bootstrap()
