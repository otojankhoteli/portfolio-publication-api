import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from './User';

@Entity('portfolio')
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'img_url', nullable: true})
  imgUrl: string;

  @Column({name: 'create_date'})
  createDate: Date;

  @Column({name: 'update_date'})
  updateDate: Date;

  @ManyToOne(() => User, (user) => user.portfolios)
  user: User;
}
