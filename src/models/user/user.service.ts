import { Injectable } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async createUser(userDto: CreateUserDto) {
    const user = await this.usersRepo.create(userDto)
    return await this.usersRepo.save(user)
  }

  async getUser(id) {
    return await this.usersRepo.findOne({ where: {id: id} })
  }

  async createDeposit(sum, userId) {
    let user = await this.usersRepo.findOne({ where: {id: userId} })
    user.deposit_sum = sum
    user.deposit_data = this.generateComment().toString()
    await this.usersRepo.save(user)

    return user.deposit_data
  }

  async updateBalance(balance, userId) {
    let user = await this.usersRepo.findOne({ where: {id: userId} })
    user.balance = balance
    await this.usersRepo.save(user)
    return user
  }

  async clearDepositInfo(id) {
    let user = await this.usersRepo.findOne({ where: {id: id} })
    user.deposit_sum = 0
    user.deposit_data = ""
    await this.usersRepo.save(user)
  }

  private generateComment() {
    let rand = 1000000 - 0.5 + Math.random() * (9999999 - 1000000 + 1);
    return Math.round(rand);
  }
}
