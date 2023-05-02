import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './model/entity/pet.entity';
import { UserEntity } from './model/entity/user.entity';
import { StartScene } from '../scenes/start.scene';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity, UserEntity])],
  providers: [BotService, BotUpdate, StartScene],
})
export class BotModule {}
