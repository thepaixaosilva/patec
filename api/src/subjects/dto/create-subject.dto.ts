import { IsNotEmpty } from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty({ message: 'Código da disciplina é obrigatório ' })
  subjectId: string;

  @IsNotEmpty({ message: 'Nome da disciplina é obrigatório ' })
  name: string;

  @IsNotEmpty({ message: 'Semestre é obrigatório ' })
  semester: number;
}
