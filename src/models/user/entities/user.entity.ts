import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public login: string

  @Column({default: 0})
  public balance: number

  @Column({nullable: true, default: ""})
  public deposit_data: string

  @Column({nullable: true, default: 0})
  public deposit_sum: number
}