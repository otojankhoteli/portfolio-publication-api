import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from './User';

@Entity('password_reset')
export class PasswordReset {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({name: 'username', referencedColumnName: 'username'})
  username: User;

  @Column()
  resetToken: string;

  @Column({name: 'create_date', default: () => 'current_timestamp'})
  createDate: Date;
}
