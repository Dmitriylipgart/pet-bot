import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './model/entity/user.entity';
import { Repository } from 'typeorm';
import { PetEntity } from './model/entity/pet.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Telegraf } from 'telegraf';
import { Context } from './model/interfaces/context.interface';
import { InjectBot } from 'nestjs-telegraf';
import { BOT_NAME } from '../shared/consts';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Pet } from './model/model/pet';

@Injectable()
export class BotService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(PetEntity)
    private readonly petRepository: Repository<PetEntity>,

    @InjectBot()
    private readonly bot: Telegraf<Context>,

    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async getUser(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneBy({
      id,
    });
  }

  async getPet(userId: number): Promise<Pet> {
    const user = await this.getUser(userId);
    return this.classMapper.mapAsync(user.pets[0], PetEntity, Pet);
  }

  saveUser(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  async feed(userId: number) {
    const pet = await this.getPet(userId);
    pet.increaseFullNess();
    await this.petRepository.save(this.classMapper.map(pet, Pet, PetEntity));
  }

  async walk(userId: number) {
    const pet = await this.getPet(userId);
    pet.increaseWalk();
    await this.petRepository.save(this.classMapper.map(pet, Pet, PetEntity));
  }

  async play(userId: number) {
    const pet = await this.getPet(userId);
    pet.increaseMood();
    await this.petRepository.save(this.classMapper.map(pet, Pet, PetEntity));
  }

  // @Cron('0 0 8-22/2 ? * *')
  @Cron('*/10 * * * * *')
  // @Cron(CronExpression.EVERY_5_SECONDS)
  async updatePetStatus() {
    const pets = await this.classMapper.mapArrayAsync(
      await this.petRepository.find({ relations: ['user'] }),
      PetEntity,
      Pet,
    );

    pets.forEach((pet) => {
      pet.updateStatus();
      const petEntity = this.classMapper.map(pet, Pet, PetEntity);
      console.log(petEntity);
      this.petRepository.save(petEntity);
    });
  }
}
