import { Body, Controller, Get, Post } from "@nestjs/common";

import { CreateCryptoDepositDto } from "./dto/create-deposit.dto";
import { CryptoService } from "./crypto.service";

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {
  }

  @Post('createDeposit')
  createDeposit(
    @Body() createDepositDto: CreateCryptoDepositDto
  ) {
    return this.cryptoService.createDeposit(createDepositDto)
  }

  @Post('checkDeposit')
  checkDeposit(@Body("userId") userId: number) {
    return this.cryptoService.checkDeposit(userId)
  }
}
