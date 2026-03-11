import { Module } from '@nestjs/common'
import { TestDaysService } from './test-days.service'
import { TestDaysController } from './test-days.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TestDay } from './entities/test-day.entity'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    TypeOrmModule.forFeature([TestDay]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [TestDaysController],
  providers: [TestDaysService],
})
export class TestDaysModule {}
