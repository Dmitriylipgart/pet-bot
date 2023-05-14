import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './model/entity/user.entity';
import { Repository } from 'typeorm';
import { PetEntity } from './model/entity/pet.entity';
import { Cron } from '@nestjs/schedule';
import { Telegraf } from 'telegraf';
import { Context } from './model/interfaces/context.interface';
import { InjectBot } from 'nestjs-telegraf';
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
    return this.classMapper.mapAsync(user.pet, PetEntity, Pet);
  }

  saveUser(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  async feed(id: number): Promise<PetEntity> {
    const user = await this.userRepository.findOneBy({ id });
    const { pet: petEntity } = user;
    const pet = this.classMapper.map(petEntity, PetEntity, Pet);
    pet.increaseFullNess();
    return await this.petRepository.save(
      this.classMapper.map(pet, Pet, PetEntity),
    );
  }

  async walk(userId: number): Promise<PetEntity> {
    const pet = await this.getPet(userId);
    pet.increaseWalk();

    return await this.petRepository.save(
      this.classMapper.map(pet, Pet, PetEntity),
    );
  }

  async play(userId: number): Promise<PetEntity> {
    const pet = await this.getPet(userId);
    pet.increaseMood();
    return await this.petRepository.save(
      this.classMapper.map(pet, Pet, PetEntity),
    );
  }

  // update pet status job starts every 4 hours from 8am to 10pm
  @Cron('0 8-22/4 * * *')
  // for testing only. starts every 10 seconds
  // @Cron('*/10 * * * * *')
  async updatePetStatus() {
    const petEntities = await this.petRepository.find({ relations: ['user'] });

    petEntities.forEach((petEntity) => {
      const pet = this.classMapper.map(petEntity, PetEntity, Pet);
      pet.updateStatus();
      if (pet.isAlive()) {
        const petEntity2 = this.classMapper.map(pet, Pet, PetEntity);
        this.petRepository.save(petEntity2);
        if (pet.isSick()) {
          this.bot.telegram.sendMessage(
            petEntity.user.id,
            'Кажется я заболел. \n Мне очень плохо.',
          );
          return;
        }
        if (pet.isStarving()) {
          this.bot.telegram.sendMessage(
            petEntity.user.id,
            'Я очень хочу кушать!!! \n Покорми меня.',
          );
          return;
        }
        if (pet.isSad()) {
          this.bot.telegram.sendMessage(
            petEntity.user.id,
            '😔 Мне грустно. \n  Поиграй со мной.',
          );
          return;
        }
        if (pet.needsToWalk()) {
          this.bot.telegram.sendMessage(
            petEntity.user.id,
            'Мне нужно погулять. \n Очень срочно.',
          );
          return;
        }
      } else {
        this.bot.telegram.sendMessage(
          petEntity.user.id,
          `☠️ Ваш питомец ${petEntity.name} умер.`,
        );
        this.petRepository.delete(pet.id);
      }
    });
  }
}
