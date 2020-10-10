import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from './User';

@Entity('portfolio')
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  imgUrl: string;

  @Column({type: 'jsonb'})
  data: JSON;

  @Column({name: 'create_date', default: () => 'current_timestamp'})
  createDate: Date;

  @Column({name: 'update_date', default: () => 'current_timestamp'})
  updateDate: Date;

  @Column()
  user: number;

  @ManyToOne(() => User, (user) => user.portfolios)
  @JoinColumn({name: 'user', referencedColumnName: 'id'})
  userValue: User;
}
