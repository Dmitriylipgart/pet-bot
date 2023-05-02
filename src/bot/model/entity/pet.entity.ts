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

  @Column()
  fullness: number;

  @Column()
  mood: number;

  @Column()
  health: number;
}
