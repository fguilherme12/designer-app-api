import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsEmail({}, { message: ' Insira um email válido /n' })
  email: string;

  @IsString({ message: ' Insira um nome válido /n' })
  name: string;

  @IsString()
  @MaxLength(20, { message: ' Máximo de caracteres (20) excedidos /n' })
  @MinLength(4, { message: ' Minimo de caracteres (4) não foi atingido /n' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: ' Sua senha não atende os requisitos /n',
  })
  password: string;
}
