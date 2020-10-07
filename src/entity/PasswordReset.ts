import {Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from './User';

@Entity('password_reset')
export class PasswordReset {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  mail: string;

  @OneToOne(() => User)
  @JoinColumn({name: 'mail', referencedColumnName: 'mail'})
  mailValue: User;

  @Index()
  @Column()
  resetToken: string;

  @Column({name: 'expire_date'})
  expireDate: Date;
}
