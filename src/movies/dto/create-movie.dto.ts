import { IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;
  @IsString()
  @IsOptional()
  readonly year: string;
  @IsString({ each: true })
  @IsOptional()
  readonly genre: string[];
}
