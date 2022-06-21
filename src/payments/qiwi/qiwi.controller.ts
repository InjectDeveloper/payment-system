import { Controller, Get } from "@nestjs/common";
import { QiwiService } from "./qiwi.service";

@Controller('qiwi')
export class QiwiController {
  constructor(private readonly qiwiService: QiwiService) {
  }


}
