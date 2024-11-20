import { IsNotEmpty, IsDate, IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { TestType } from '../enums/test-type.enum'

export class CreateTestDayDto {
  @ApiProperty({
    description: 'The date of the test',
    example: '2024-03-20T10:00:00Z',
  })
  @IsDate({ message: 'Invalid date' })
  @IsNotEmpty({ message: 'Test date is required' })
  testDate: Date

  @ApiProperty({
    description: 'The type of the test',
    enum: TestType,
    example: TestType.MIDTERM,
    enumName: 'TestType',
  })
  @IsEnum(TestType, { message: 'Invalid test type. Allowed values: MIDTERM, FINAL, QUIZ, PRACTICE' })
  @IsNotEmpty({ message: 'Test type is required' })
  testType: TestType
}
