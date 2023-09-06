import { Module } from '@nestjs/common';
import { EthereumGateway } from './gateway';
import { EtherModule } from 'src/ether/ether.module';

@Module({
  providers: [EthereumGateway],
  imports: [EtherModule],
})
export class GateWayModule {}
