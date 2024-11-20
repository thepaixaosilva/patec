import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(2, 100, { message: 'Name must be between 2 and 100 characters' })
  name: string

  @ApiProperty({ description: 'The email address of the user', example: 'user@example.com' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string

  @ApiPropertyOptional({ description: 'The student registration number (RA)', example: '1234567890123' })
  @IsOptional()
  @IsString({ message: 'RA must be a string' })
  @Length(13, 13, { message: 'RA must be 13 characters long' })
  ra?: string

  @ApiProperty({ description: 'The password for the user account', example: 'strongPassword123' })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string

  @ApiProperty({ description: 'The role assigned to the user', example: 'student' })
  @IsNotEmpty()
  @IsString()
  role: string
}
