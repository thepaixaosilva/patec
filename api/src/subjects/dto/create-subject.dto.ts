import { IsNotEmpty, IsString, IsInt, Min, Max, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateSubjectDto {
  @ApiProperty({
    description: 'The unique code for the subject',
    example: 'MAT001',
    minLength: 4,
    maxLength: 20,
  })
  @IsString({ message: 'Subject code must be a string' })
  @IsNotEmpty({ message: 'Subject code is required' })
  @Length(4, 20, { message: 'Subject code must be between 4 and 20 characters' })
  subjectId: string

  @ApiProperty({
    description: 'The name of the subject',
    example: 'Calculus I',
    minLength: 3,
    maxLength: 100,
  })
  @IsString({ message: 'Subject name must be a string' })
  @IsNotEmpty({ message: 'Subject name is required' })
  @Length(3, 100, { message: 'Subject name must be between 3 and 100 characters' })
  name: string

  @ApiProperty({
    description: 'The semester in which the subject is taught',
    example: 1,
    minimum: 1,
    maximum: 10,
  })
  @IsInt({ message: 'Semester must be an integer' })
  @IsNotEmpty({ message: 'Semester is required' })
  @Min(1, { message: 'Semester must be at least 1' })
  @Max(10, { message: 'Semester must be at most 10' })
  semester: number
}
