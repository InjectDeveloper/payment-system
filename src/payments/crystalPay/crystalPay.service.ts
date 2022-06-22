import { Injectable } from "@nestjs/common";
import { CreateCrystalPayDepositDto } from "./dto/create-deposit.dto";
import { CrystallPayApiService } from "../../core/paymentsApi/crystallPay/crystallPay-api.service";
import { UserService } from "../../models/user/user.service";

@Injectable()
export class CrystalPayService {
  constructor(private readonly crystalApi: CrystallPayApiService,
              private readonly userService: UserService) {}

  async createDeposit(createDepositDto: CreateCrystalPayDepositDto) {
    const data = await this.crystalApi.getDepositLink(createDepositDto.sum)
    const deposit = await this.userService.createDeposit(createDepositDto.sum, createDepositDto.userId, data.id)

    return data.url
  }

  async checkDeposit(userId) {
    const user = await this.userService.getUser(userId)
    const data = await this.crystalApi.getDepositById(user.deposit_data)
    if(data.state == "payed") {
      this.userService.updateBalance(user.deposit_sum + user.balance, user.id)
      this.userService.clearDepositInfo(user.id)
      return true
    } else return false
  }
}