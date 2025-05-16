import { IsDateString, IsInt, IsString, Min } from 'class-validator';

export class CreateActividadDto {
  @IsString()
  titulo: string;

  @IsDateString()
  fecha: string;

  @IsInt()
  @Min(1)
  cupoMaximo: number;
}
