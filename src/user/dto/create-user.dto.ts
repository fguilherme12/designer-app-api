import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserEntity } from '../entities/user.entity';
import { EmailUnique } from '../middleware/email-is-unique.validator';

export class CreateUserDto extends UserEntity {
  @IsEmail({}, { message: ' Insira um email válido ' })
  @EmailUnique({ message: 'Email já está cadastrado.' })
  email: string;

  @IsString({ message: ' Insira um nome válido ' })
  name: string;

  @IsString()
  @MaxLength(20, { message: ' Máximo de caracteres (20) excedidos ' })
  @MinLength(4, { message: ' Minimo de caracteres (4) não foi atingido ' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: ' Sua senha não atende os requisitos ',
  })
  password: string;
}
