import { Body, Controller, Get, Post } from "@nestjs/common";
import { QiwiService } from "./qiwi.service";
import { CreateQiwiDepositDto } from "./dto/create-deposit.dto";

@Controller('qiwi')
export class QiwiController {
  constructor(private readonly qiwiService: QiwiService) {
  }

  @Post('createDeposit')
  createDeposit(
    @Body() createDepositDto: CreateQiwiDepositDto
  ) {
    return this.qiwiService.createDeposit(createDepositDto)
  }

  @Post('checkDeposit')
  checkDeposit(@Body("userId") userId: number) {
    return this.qiwiService.checkDeposit(userId)
  }
}
