import { PartialType } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'
import { IsOptional, IsString, IsEmail, Length } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ description: 'The updated name of the user', example: 'Jane Doe' })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @Length(2, 100, { message: 'Name must be between 2 and 100 characters' })
  name?: string

  @ApiPropertyOptional({ description: 'The updated email address of the user', example: 'newemail@example.com' })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email' })
  email?: string

  @ApiPropertyOptional({ description: 'The updated student registration number (RA)', example: '0987654321098' })
  @IsOptional()
  @IsString({ message: 'RA must be a string' })
  @Length(5, 20, { message: 'RA must be between 5 and 20 characters' })
  ra?: string

  @ApiPropertyOptional({ description: 'The new password for the user', example: 'newSecurePassword456' })
  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  password?: string
}
