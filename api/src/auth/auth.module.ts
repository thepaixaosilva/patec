import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: `ecq/2B"/#8rC~3&FA1h@A24$pQ(Tp^oJCR+Lq%[Rp;;sa[,Zq9Z>?YK"Q9uw%/-mo99bp@:GE8Pif%0~z]tpf9/Y}|Tdn{|]"_0H`,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
