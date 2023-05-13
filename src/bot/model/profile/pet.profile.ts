import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  ignore,
  mapFrom,
  Mapper,
} from '@automapper/core';
import { PetEntity } from '../entity/pet.entity';
import { Pet } from '../model/pet';

@Injectable()
export class PetProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        Pet,
        PetEntity,
        // forMember(
        //   (pet) => pet.user.id,
        //   // mapFrom((petEntity) => petEntity.userId),
        //   ignore(),
        // ),
      );
      createMap(
        mapper,
        PetEntity,
        Pet,
        // forMember(
        //   (pet) => pet.userId,
        //   // ignore(),
        //   mapFrom((petEntity) => petEntity.user.id),
        // ),
      );
    };
  }
}
