import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class PetEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.pet)
  @JoinColumn()
  user: UserEntity;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column({ default: 7 })
  fullness: number;

  @AutoMap()
  @Column({ default: 10 })
  mood: number;

  @AutoMap()
  @Column({ default: 7 })
  walk: number;

  @AutoMap()
  @Column({ default: 10 })
  health: number;
}
