import { IsNotEmpty } from 'class-validator';
import { AnswerKey } from 'src/answer-keys/entities/answer-key.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateStudentAnswerDto {
  score: number;

  @IsNotEmpty({ message: 'Resposta obrigatória!' })
  answer1: string;

  @IsNotEmpty({ message: 'Resposta obrigatória!' })
  answer2: string;

  @IsNotEmpty({ message: 'Resposta obrigatória!' })
  answer3: string;

  @IsNotEmpty({ message: 'Resposta obrigatória!' })
  answer4: string;

  @IsNotEmpty({ message: 'Resposta obrigatória!' })
  answer5: string;

  @IsNotEmpty({ message: 'Aluno é obrigatório!' })
  user: User;

  @IsNotEmpty({ message: 'Gabarito é obrigatório!' })
  answerKey: AnswerKey;
}
