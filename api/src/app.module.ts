import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './modules/users/users.module'
import { SubjectsModule } from './modules/subjects/subjects.module'
import { AnswerKeysModule } from './modules/answer-keys/answer-keys.module'
import { StudentAnswersModule } from './modules/student-answers/student-answers.module'
import { TestDaysModule } from './modules/test-days/test-days.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { UserSubjectModule } from './modules/user-subject/user-subject.module'
import { ConfigModule } from '@nestjs/config'
import { AuthController } from './modules/auth/auth.controller'
import { AuthGuard } from './guards/auth.guard'
import { AuthService } from './modules/auth/auth.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { TypeOrmConfigService } from './database/typeorm-config.service'
import appConfig from './config/app.config'
import databaseConfig from './database/config/database.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
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
}
