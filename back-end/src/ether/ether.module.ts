import { Global, Module } from '@nestjs/common';
import { EtherService } from './ether.service';
import { EtherController } from './ether.controller';
import { NetworkService } from 'src/network/network.service';
import { NetworkModule } from 'src/network/network.module';

@Global()
@Module({
  controllers: [EtherController],
  providers: [EtherService],
  exports: [EtherService],
  imports: [NetworkModule],
})
export class EtherModule {}
