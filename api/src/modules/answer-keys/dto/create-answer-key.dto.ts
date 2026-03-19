import { IsNotEmpty, IsInt, IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateAnswerKeyDto {
  @ApiProperty({
    description: 'The first answer in the answer key',
    example: 'A',
  })
  @IsString()
  @Length(1, 1, { message: 'Answer must be a single character' })
  @IsNotEmpty({ message: 'Answer is required!' })
  answer1: string

  @ApiProperty({
    description: 'The second answer in the answer key',
    example: 'B',
  })
  @IsString()
  @Length(1, 1, { message: 'Answer must be a single character' })
  @IsNotEmpty({ message: 'Answer is required!' })
  answer2: string

  @ApiProperty({
    description: 'The third answer in the answer key',
    example: 'C',
  })
  @IsString()
  @Length(1, 1, { message: 'Answer must be a single character' })
  @IsNotEmpty({ message: 'Answer is required!' })
  answer3: string

  @ApiProperty({
    description: 'The fourth answer in the answer key',
    example: 'D',
  })
  @IsString()
  @Length(1, 1, { message: 'Answer must be a single character' })
  @IsNotEmpty({ message: 'Answer is required!' })
  answer4: string

  @ApiProperty({
    description: 'The fifth answer in the answer key',
    example: 'E',
  })
  @IsString()
  @Length(1, 1, { message: 'Answer must be a single character' })
  @IsNotEmpty({ message: 'Answer is required!' })
  answer5: string

  @ApiProperty({
    description: 'The ID of the test day',
    example: 1,
  })
  @IsInt({ message: 'Test day must be an integer' })
  @IsNotEmpty({ message: 'Test day is required!' })
  testDayId: number

  @ApiProperty({
    description: 'The ID of the subject',
    example: 1,
  })
  @IsString({ message: 'Subject must be a string' })
  @IsNotEmpty({ message: 'Subject is required!' })
  subjectId: string
}
  