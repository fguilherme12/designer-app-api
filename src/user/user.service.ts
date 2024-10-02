import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(criarUsuario: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...criarUsuario,
      password: await bcrypt.hash(criarUsuario.password, 10),
    };

    const usuarioCriado = await this.prisma.user.create({ data });

    return {
      ...usuarioCriado,
      password: undefined,
    };
  }

  async findAll() {
    const usuarios = await this.prisma.user.findMany();
    return {
      ...usuarios,
      password: undefined,
    };
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const deletarUsuario = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
    return `Usuario de ID: ${id} deletado com sucesso.`;
  }
}
