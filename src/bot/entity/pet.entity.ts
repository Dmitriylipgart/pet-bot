import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../shared/User.entity';

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
