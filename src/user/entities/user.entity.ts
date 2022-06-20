import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public login: string

  @Column({default: 0})
  public balance: number

  @Column()
  public deposit_data: string
}