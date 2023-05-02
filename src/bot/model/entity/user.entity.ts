import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PetEntity } from './pet.entity';

@Entity()
export class UserEntity {
  @PrimaryColumn()
  id: number;

  @OneToMany(() => PetEntity, (pet) => pet.user, {
    cascade: true,
  })
  pets: PetEntity[];
}
