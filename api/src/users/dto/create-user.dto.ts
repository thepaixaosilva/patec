import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome é obrigatório ' })
  name: string

  @IsNotEmpty({ message: 'Email é obrigatório ' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string

  @IsNotEmpty({ message: 'Perfil é obrigatório ' })
  profile: string

  @IsNotEmpty({ message: 'Senha é obrigatória ' })
  password: string
}
