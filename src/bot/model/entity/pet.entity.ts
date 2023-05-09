import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class PetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.pets)
  user: UserEntity;

  @Column()
  name: string;

  @Column({ default: 10 })
  fullness: number;

  @Column({ default: 10 })
  mood: number;

  @Column({ default: 10 })
  walk: number;

  @Column({ default: 10 })
  health: number;
}
