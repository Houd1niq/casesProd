import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';

@WebSocketGateway({
  cors: ['http://127.0.0.1:5173'],
})
export class GatewayService implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  currentOnline = 0;

  constructor(readonly prisma: PrismaService) {}

  @SubscribeMessage('minutePass')
  async handleTimePass(socket: Socket, payload: any) {
    const user = await this.prisma.user.update({
      where: {
        id: payload.userId,
      },
      data: {
        minutesCounter: {
          increment: 1,
        },
      },
    });
  }

  @SubscribeMessage('boxOpened')
  async handleBoxOpened(client: Socket, payload: any) {
    const lastBox = await this.prisma.userItem.findMany({
      orderBy: {
        timestamp: 'desc',
      },
      take: 1,
      select: {
        timestamp: true,
        user: {
          select: {
            name: true,
            id: true,
          },
        },
        item: {
          select: {
            name: true,
            image: true,
            price: true,
            id: true,
          },
        },
      },
    });
    const countOfOpenedBoxes = await this.prisma.userItem.count();
    console.log(countOfOpenedBoxes, 'countOfOpenedBoxes');
    this.server.emit('boxOpened', { lastBox: lastBox[0], countOfOpenedBoxes });
  }

  async onModuleInit(): Promise<void> {
    this.server.on('connection', async (socket: Socket) => {
      const boxesCount = await this.prisma.userItem.count();
      const usersCount = await this.prisma.user.count();
      this.currentOnline++;
      this.server.emit('onOnlineUpdate', {
        currentOnline: this.currentOnline,
      });
      this.server.emit('onConnect', {
        boxesCount,
        usersCount,
      });
    });
  }

  handleDisconnect(_: Socket) {
    this.currentOnline--;
    this.server.emit('onOnlineUpdate', {
      currentOnline: this.currentOnline,
    });
  }
}
