import { IsNotEmpty, IsDate } from 'class-validator';

export class CreateTestDayDto {
  @IsDate({ message: 'Data inválida' })
  @IsNotEmpty({ message: 'Data é obrigatória ' })
  testDate: Date;

  @IsNotEmpty({ message: 'Tipo da avaliação é obrigatório ' })
  testType: string;
}
