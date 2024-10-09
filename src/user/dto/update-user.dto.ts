import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EmailUnique } from '../middleware/email-is-unique.validator';

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsOptional()
  name: string;

  @IsEmail({}, { message: 'O e-mail informado é inválido' })
  @EmailUnique({ message: 'Email já está cadastrado.' })
  @IsOptional()
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(20, { message: ' Máximo de caracteres (20) excedidos ' })
  @MinLength(4, { message: ' Minimo de caracteres (4) não foi atingido ' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: ' Sua senha não atende os requisitos ',
  })
  password: string;
}
