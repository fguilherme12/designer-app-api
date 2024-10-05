import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
  @IsEmail({}, { message: 'O E-mail inserido não é válido ' })
  email: string;

  @IsString()
  password: string;
}
