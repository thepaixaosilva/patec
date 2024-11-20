import { Role } from '../../enums/roles.enum'
import { StudentAnswer } from '../../student-answers/entities/student-answer.entity'
import { UserSubject } from '../../user-subject/entities/user-subject.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty, ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@Entity('users')
export class User {
  @ApiProperty({
    example: 1,
    description: 'ID único do usuário',
    minimum: 1,
    required: true,
  })
  @PrimaryGeneratedColumn({
    comment: 'ID único do usuário gerado automaticamente',
  })
  id: number

  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
    minLength: 3,
    maxLength: 100,
    required: true,
  })
  @Column({
    length: 100,
    comment: 'Nome completo do usuário',
  })
  name: string

  @ApiProperty({
    example: '12345',
    description: 'Registro do aluno (RA)',
    required: false,
    minLength: 5,
    maxLength: 20,
    uniqueItems: true,
    nullable: true,
  })
  @Column({
    length: 20,
    nullable: true,
    unique: true,
    comment: 'Número de registro do aluno (RA)',
  })
  ra: string

  @ApiProperty({
    example: 'joao.silva@email.com',
    description: 'Email do usuário',
    format: 'email',
    required: true,
    maxLength: 100,
  })
  @Column({
    length: 100,
    comment: 'Endereço de email do usuário',
  })
  email: string

  @ApiProperty({
    example: 'hash_senha_123',
    description: 'Senha do usuário (hash)',
    required: true,
    writeOnly: true,
  })
  @Column({
    comment: 'Senha criptografada do usuário',
  })
  password: string

  @ApiProperty({
    enum: Role,
    example: Role.Student,
    description: 'Papel do usuário no sistema (Student ou Teacher)',
    default: Role.Student,
    required: true,
  })
  @Column({
    type: 'text',
    default: Role.Student,
    comment: 'Papel do usuário (estudante ou professor)',
  })
  role: Role

  @ApiProperty({
    type: () => [UserSubject],
    description: 'Disciplinas associadas ao usuário',
    required: false,
    isArray: true,
  })
  @OneToMany(() => UserSubject, (userSubject) => userSubject.user, {
    cascade: ['insert', 'update'],
    eager: false,
  })
  userSubject: UserSubject[]

  @ApiProperty({
    type: () => [StudentAnswer],
    description: 'Respostas do aluno às avaliações',
    required: false,
    isArray: true,
  })
  @OneToMany(() => StudentAnswer, (studentAnswer) => studentAnswer.user)
  answers: StudentAnswer[]
}
