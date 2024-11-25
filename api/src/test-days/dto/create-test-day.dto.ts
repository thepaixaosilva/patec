import { IsNotEmpty, IsDate, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { TestType } from '../enums/test-type.enum'
import { Transform } from 'class-transformer'

export class CreateTestDayDto {
  @ApiProperty({
    description: 'The date of the test',
    example: '2024-03-20T10:00:00Z',
  })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'Invalid date' })
  @IsNotEmpty({ message: 'Test date is required' })
  testDate: Date

  @ApiProperty({
    description: 'The type of the test',
    enum: TestType,
    example: TestType.MIDTERM,
    enumName: 'TestType',
  })
  @IsString()
  @IsNotEmpty({ message: 'Test type is required' })
  testType: string

  @IsOptional()
  @IsString()
  filePath?: string
}
