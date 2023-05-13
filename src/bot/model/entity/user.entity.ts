import { Entity, OneToOne, PrimaryColumn, Relation } from 'typeorm';
import { PetEntity } from './pet.entity';

@Entity()
export class UserEntity {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => PetEntity, (pet) => pet.user, {
    cascade: true,
    eager: true,
  })
  pet: Relation<PetEntity>;
}
