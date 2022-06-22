import { Inject, Injectable, Logger } from "@nestjs/common";

import { UserService } from "../../models/user/user.service";
import { CreateCryptoDepositDto } from "./dto/create-deposit.dto";
import { CryptoApiService } from "../../core/paymentsApi/crypto/crypto-api.service";



@Injectable()
export class CryptoService {
  constructor(
    private readonly cryptoService: CryptoApiService,
    private readonly userService: UserService
  ) {}

  async createDeposit(createDepositDto: CreateCryptoDepositDto) {
    const newWallet = await this.cryptoService.getNewAdress()
    const deposit = await this.userService.createDeposit(createDepositDto.sum, createDepositDto.userId, newWallet)
    return {
      "wallet": newWallet,
      "sum": createDepositDto.sum
    }
  }

  async checkDeposit(id) {
    const user = await this.userService.getUser(id)
    const wallet_balance = await this.cryptoService.getAdressBalance(user.deposit_data)
    if (wallet_balance == user.deposit_sum) {
      this.userService.updateBalance(user.deposit_sum + user.balance, user.id)
      this.userService.clearDepositInfo(user.id)
      return true
    }
    else {
      return false
    }
  }

}
