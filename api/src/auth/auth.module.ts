import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { APP_GUARD } from '@nestjs/core'
import { RolesGuard } from 'src/guards/roles.guard'
import { AuthGuard } from 'src/guards/auth.guard'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: `ecq/2B"/#8rC~3&FA1h@A24$pQ(Tp^oJCR+Lq%[Rp;;sa[,Zq9Z>?YK"Q9uw%/-mo99bp@:GE8Pif%0~z]tpf9/Y}|Tdn{|]"_0H`,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // Aplicando o AuthGuard globalmente
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Se você também precisar aplicar o RolesGuard globalmente
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
