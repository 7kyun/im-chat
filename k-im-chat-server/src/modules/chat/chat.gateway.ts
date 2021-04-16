import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
// import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  // socket连接钩子
  async handleConnection(): Promise<string> {
    console.log('连接成功');
    return '连接成功';
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('client', client);
    console.log('payload', payload);
    return 'Hello world!';
  }
}
