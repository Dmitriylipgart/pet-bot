import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './model/entity/pet.entity';
import { UserEntity } from './model/entity/user.entity';
import { StartScene } from '../scenes/start.scene';
import { NewPetScene } from '../scenes/new-pet.scene';
import { StatusScene } from '../scenes/status.scene';
import { PetProfile } from './model/profile/pet.profile';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([PetEntity, UserEntity]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'assets'),
    }),
  ],
  providers: [
    BotService,
    BotUpdate,
    StartScene,
    NewPetScene,
    StatusScene,
    PetProfile,
  ],
})
export class BotModule {}
