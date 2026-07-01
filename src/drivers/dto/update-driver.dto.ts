import { PartialType } from '@nestjs/swagger';
import { CreateDriverDto } from './create-driver.dto';
import { IsEnum, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { DriverStatus } from '../schemas/driver.schema';

export class UpdateDriverDto extends PartialType(CreateDriverDto) {
  @ApiPropertyOptional({ description: 'Status do motorista', enum: DriverStatus })
  @IsOptional()
  @IsEnum(DriverStatus, { message: 'O status do motorista selecionado é inválido.' })
  status?: DriverStatus;

  @ApiPropertyOptional({ description: 'Avaliação (0-5)' })
  @IsOptional()
  @IsNumber({}, { message: 'A avaliação deve ser um número.' })
  @Min(0, { message: 'A avaliação mínima é 0.' })
  @Max(5, { message: 'A avaliação máxima é 5.' })
  rating?: number;
}
