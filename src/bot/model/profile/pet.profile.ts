import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { PetEntity } from '../entity/pet.entity';
import { Pet } from '../model/pet';

@Injectable()
export class PetProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Pet, PetEntity);
      createMap(mapper, PetEntity, Pet);
      // createMap(
      //   mapper,
      //   EventCreateDto,
      //   Event,
      //   forMember((dest) => dest.id, ignore()),
      // );
    };
  }
}
