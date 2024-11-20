import { IsDate, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Subject } from 'src/subjects/entities/subject.entity'
import { TestDay } from 'src/test-days/entities/test-day.entity'

export class CreateAnswerKeyDto {
  @ApiProperty({
    description: 'The first answer in the answer key',
    example: 'A',
  })
  @IsNotEmpty({ message: 'Answer is required!' })
  answer1: string

  @ApiProperty({
    description: 'The second answer in the answer key',
    example: 'B',
  })
  @IsNotEmpty({ message: 'Answer is required!' })
  answer2: string

  @ApiProperty({
    description: 'The third answer in the answer key',
    example: 'C',
  })
  @IsNotEmpty({ message: 'Answer is required!' })
  answer3: string

  @ApiProperty({
    description: 'The fourth answer in the answer key',
    example: 'D',
  })
  @IsNotEmpty({ message: 'Answer is required!' })
  answer4: string

  @ApiProperty({
    description: 'The fifth answer in the answer key',
    example: 'E',
  })
  @IsNotEmpty({ message: 'Answer is required!' })
  answer5: string

  @ApiProperty({
    description: 'The date of the test',
    example: '2024-05-15T08:30:00Z',
  })
  @IsDate({ message: 'Invalid date!' })
  @IsNotEmpty({ message: 'Test day is required!' })
  testDay: TestDay

  @ApiProperty({
    description: 'The subject associated with the answer key',
    example: { id: 1, name: 'Mathematics' },
  })
  @IsNotEmpty({ message: 'Subject is required!' })
  subject: Subject
}
