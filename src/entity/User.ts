import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Portfolio} from './Portfolio';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Index()
  @Column({unique: true})
  mail: string;

  @Column()
  name: string;

  @Column()
  surname: string

  @Column({name: 'img_url', nullable: true})
  imgUrl: string;

  @Column({name: 'create_date', default: () => 'current_timestamp'})
  createDate: Date;

  @Column({name: 'update_date', default: () => 'current_timestamp'})
  updateDate: Date;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
  portfolios: Portfolio[];
}
