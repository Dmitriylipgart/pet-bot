import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './model/entity/user.entity';
import { Repository } from 'typeorm';
import { PetEntity } from './model/entity/pet.entity';

@Injectable()
export class BotService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(PetEntity)
    private readonly petRepository: Repository<PetEntity>,
  ) {}

  async getUser(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneBy({
      id,
    });
  }

  saveUser(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }
}
