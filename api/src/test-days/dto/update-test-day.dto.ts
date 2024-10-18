import { PartialType } from '@nestjs/mapped-types';
import { CreateTestDayDto } from './create-test-day.dto';

export class UpdateTestDayDto extends PartialType(CreateTestDayDto) {}
