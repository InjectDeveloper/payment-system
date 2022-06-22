import { Module } from '@nestjs/common';
import { CrystalPayController } from "./crystalPay.controller";
import { CrystalPayService } from "./crystalPay.service";
import { CrystallPayApiModuleModule } from "../../core/paymentsApi/crystallPay/crystallPay-api.module";
import { UserModule } from "../../models/user/user.module";

@Module({
  imports: [CrystallPayApiModuleModule, UserModule,],
  controllers: [CrystalPayController],
  providers: [CrystalPayService]
})
export class CrystalPayModule {}
