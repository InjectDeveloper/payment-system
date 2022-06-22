import { Module } from "@nestjs/common";
import { CrystallPayApiService } from "./crystallPay-api.service";

@Module({
  imports: [],
  providers: [CrystallPayApiService],
  exports: [CrystallPayApiService],
})
export class CrystallPayApiModuleModule {}
