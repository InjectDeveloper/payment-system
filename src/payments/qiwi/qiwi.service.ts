import { Inject, Injectable, Logger } from "@nestjs/common";

import { UserService } from "../../models/user/user.service";
import { QiwiApiService } from "../../core/paymentsApi/qiwi/qiwi-api.service";


@Injectable()
export class QiwiService {
  constructor(
    private readonly qiwiApiService: QiwiApiService,
    private readonly userService: UserService
  ) {}

  async createDeposit(createDepositDto) {
    const comment = await this.userService.createDeposit(createDepositDto.sum, createDepositDto.userId)
    return {
      "sum": createDepositDto.sum,
      "comment": comment
    }
  }

  async checkDeposit(id) {
    const user = await this.userService.getUser(id)

    Logger.log(user.deposit_data)
    const payments = await this.qiwiApiService.getDepositByCommentAndSum(user.deposit_data, user.deposit_sum)
    if(payments) {
      this.userService.updateBalance(payments.sum.amount + user.balance, user.id)
      this.userService.clearDepositInfo(user.id)
    }
    return payments || false
  }

}
