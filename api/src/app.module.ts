import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { SubjectsModule } from './subjects/subjects.module'
import { AnswerKeysModule } from './answer-keys/answer-keys.module'
import { StudentAnswersModule } from './student-answers/student-answers.module'
import { TestDaysModule } from './test-days/test-days.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from './ormconfig'
import { AuthModule } from './auth/auth.module'
import { UserSubjectModule } from './user-subject/user-subject.module'
// import { CreateCoordinatorCommand } from './commands/create-coordinator.command'
import { User } from './users/entities/user.entity'
import { ConfigModule } from '@nestjs/config'
import { LoggerMiddleware } from './middlewares/logger.middleware'
import { AuthController } from './auth/auth.controller'
import { AuthGuard } from './guards/auth.guard'
import { AuthService } from './auth/auth.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([User]),
    UsersModule,
    SubjectsModule,
    AnswerKeysModule,
    StudentAnswersModule,
    TestDaysModule,
    AuthModule,
    UserSubjectModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dist', 'uploads', 'test-days'), // Caminho para o diretório de uploads dentro de dist
      serveRoot: '/uploads', // Prefixo da URL para acessar os arquivos
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, AuthGuard],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL }) // Aplica o middleware para todas as rotas
  }
}
