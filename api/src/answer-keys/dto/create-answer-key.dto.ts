import { IsDate, IsNotEmpty } from 'class-validator'
import { Subject } from 'src/subjects/entities/subject.entity'
import { TestDay } from 'src/test-days/entities/test-day.entity'

export class CreateAnswerKeyDto {
  @IsNotEmpty({ message: 'Resposta obrigatória!' })
  answer1: string

  @IsNotEmpty({ message: 'Resposta obrigatória!' })
  answer2: string

  @IsNotEmpty({ message: 'Resposta obrigatória!' })
  answer3: string

  @IsNotEmpty({ message: 'Resposta obrigatória!' })
  answer4: string

  @IsNotEmpty({ message: 'Resposta obrigatória!' })
  answer5: string

  @IsDate({ message: 'Data inválida!' })
  @IsNotEmpty({ message: 'Data da prova obrigatória!' })
  testDay: TestDay

  @IsNotEmpty({ message: 'Disciplina é obrigatória!' })
  subject: Subject
}
