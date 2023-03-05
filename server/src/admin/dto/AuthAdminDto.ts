import { IsNotEmpty, IsString } from 'class-validator';

export class AuthAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
