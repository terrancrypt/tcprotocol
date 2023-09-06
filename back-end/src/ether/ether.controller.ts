import { Controller, Get } from '@nestjs/common';
import { EtherService } from './ether.service';

@Controller('ether')
export class EtherController {
  constructor(private readonly etherServices: EtherService) {}
  @Get('collateral-list')
  async getCollateralList() {
    return this.etherServices.getCollateralList('ethereumSepolia');
  }
}
