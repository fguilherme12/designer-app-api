import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsEmail({}, { message: 'Insira um email válido' })
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MaxLength(20)
  @MinLength(4)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Sua senha não atende os requisitos',
  })
  password: string;
}
