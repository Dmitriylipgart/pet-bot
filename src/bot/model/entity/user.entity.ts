import {
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { PetEntity } from './pet.entity';

@Entity()
export class UserEntity {
  @PrimaryColumn()
  id: number;

  @OneToMany(() => PetEntity, (pet) => pet.user, {
    cascade: true,
    eager: true,
  })
  pets: Relation<PetEntity[]>;
}
