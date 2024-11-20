import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { AnswerKey } from 'src/answer-keys/entities/answer-key.entity'
import { User } from 'src/users/entities/user.entity'

export class CreateStudentAnswerDto {
  @ApiProperty({
    description: 'The score of the student on the test',
    example: 85,
  })
  score: number

  @ApiProperty({
    description: 'The first answer provided by the student',
    example: 'A',
  })
  @IsNotEmpty({ message: 'Answer is required!' })
  answer1: string

  @ApiProperty({
    description: 'The second answer provided by the student',
    example: 'B',
  })
  @IsNotEmpty({ message: 'Answer is required!' })
  answer2: string

  @ApiProperty({
    description: 'The third answer provided by the student',
    example: 'C',
  })
  @IsNotEmpty({ message: 'Answer is required!' })
  answer3: string

  @ApiProperty({
    description: 'The fourth answer provided by the student',
    example: 'D',
  })
  @IsNotEmpty({ message: 'Answer is required!' })
  answer4: string

  @ApiProperty({
    description: 'The fifth answer provided by the student',
    example: 'E',
  })
  @IsNotEmpty({ message: 'Answer is required!' })
  answer5: string

  @ApiProperty({
    description: 'The user (student) associated with the answers',
    example: { id: 1, name: 'John Doe' },
  })
  @IsNotEmpty({ message: 'User is required!' })
  user: User

  @ApiProperty({
    description: 'The answer key used to grade the answers',
    example: { id: 2 },
  })
  @IsNotEmpty({ message: 'Answer key is required!' })
  answerKey: AnswerKey
}
