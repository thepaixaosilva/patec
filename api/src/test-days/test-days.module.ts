import { Module } from '@nestjs/common'
import { TestDaysService } from './test-days.service'
import { TestDaysController } from './test-days.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TestDay } from './entities/test-day.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TestDay])],
  controllers: [TestDaysController],
  providers: [TestDaysService],
})
export class TestDaysModule {}
