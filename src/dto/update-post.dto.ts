import { IsString, IsBoolean } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  title?: string;
  @IsString()
  content?: string;
  @IsBoolean()
  published?: boolean;
}