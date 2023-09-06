import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GateWayModule } from './gateway/gateway.module';
import { EtherModule } from './ether/ether.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GateWayModule,
    EtherModule,
  ],
  providers: [],
})
export class AppModule {}
