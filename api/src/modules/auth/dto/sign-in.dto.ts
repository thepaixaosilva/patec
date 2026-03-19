import { IsEmail, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SignInDto {
  @ApiProperty({
    description: 'The email address used to sign in',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Invalid email' })
  email: string

  @ApiProperty({
    description: 'The password for authentication',
    example: 'securepassword123',
  })
  @IsNotEmpty({ message: 'Password is required' })
  password: string
}
