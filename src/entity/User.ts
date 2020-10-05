import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({name: 'img_url', nullable: true})
  imgUrl: string;

  @Column({name: 'create_date'})
  createDate: Date;

  @Column({name: 'update_date'})
  updateDate: Date;
}
