import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find();

    return {
      ...users,
    };
  }

  async createUser(userEntity: UserEntity) {
    const data = {
      ...userEntity,
      password: await bcrypt.hash(userEntity.password, 10),
    };
    const userCreated = await this.userRepository.save(data);
    return { ...userCreated, password: undefined };
  }

  async findByEmail(email: string) {
    const checkEmail = await this.userRepository.findOne({
      where: { email },
    });
    return checkEmail;
  }

  async findOne(id: number) {
    const returnUser = await this.userRepository.findOne({
      where: { id },
    });

    return returnUser;
  }

  async updateuser(id: string, data: UpdateUserDTO) {
    await this.userRepository.update(id, data);
    return 'Usuário atualizado com sucesso.';
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
    return 'Usuário deletado com sucesso.';
  }
}
