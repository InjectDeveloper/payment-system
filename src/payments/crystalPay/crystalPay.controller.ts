import { Body, Controller, Get, Post } from "@nestjs/common";
import { CrystalPayService } from "./crystalPay.service";
import { CreateCrystalPayDepositDto } from "./dto/create-deposit.dto";

@Controller('crystalPay')
export class CrystalPayController {
  constructor(private readonly crystalPayService: CrystalPayService) {
  }
  @Post('createDeposit')
  createDeposit(
    @Body() createDepositDto: CreateCrystalPayDepositDto
  ) {
    return this.crystalPayService.createDeposit(createDepositDto)
  }

  @Post('checkDeposit')
  checkDeposit(@Body("userId") userId: number) {
    return this.crystalPayService.checkDeposit(userId)
  }
}