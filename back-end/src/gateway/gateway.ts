import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EtherService } from 'src/ether/ether.service';

@WebSocketGateway(8001, {
  cors: {
    origin: ['http://localhost:5173'],
  },
})
export class EthereumGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly etherService: EtherService) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Gateway opened!');
    });
  }

  @SubscribeMessage('getCollateralEvent')
  async handleEvent(@MessageBody() body: any) {
    try {
      const result = await this.etherService.getCollateralList(body);
      console.log('Received result:', result);

      // Emit kết quả đến các clients
      this.server.emit('getCollateralListResponse', result);
    } catch (error) {
      console.error('Error:', error);
      // Nếu có lỗi, bạn có thể emit lỗi về clients để xử lý
      this.server.emit('getCollateralListError', error.message);
    }
  }
}
