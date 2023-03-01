import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BoxesService {
  constructor(private readonly prisma: PrismaService) {}

  async getBoxes() {
    return await this.prisma.case.findMany({
      select: {
        id: true,
        image: true,
        name: true,
        price: true,
        description: true,
        CaseItem: {
          select: {
            drop_rate: true,
            item: {
              select: {
                id: true,
                name: true,
                image: true,
                price: true,
              },
            },
          },
        },
      },
    });
  }

  async getLastBoxes() {
    return await this.prisma.userItem.findMany({
      orderBy: {
        id: 'desc',
      },
      take: 20,
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
  }

  async rollBox(userId: string, boxId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        balance: true,
      },
    });
    if (!user) throw new BadRequestException('User not found');
    const box = await this.prisma.case.findUnique({
      where: {
        id: boxId,
      },
      select: {
        price: true,
      },
    });
    const balance = Number.parseFloat(String(user.balance));
    if (!box) throw new BadRequestException('Box not found');
    if (balance < box.price) throw new BadRequestException('Not enough money');
    const random = Math.random();
    const caseItems = await this.prisma.caseItem.findMany({
      where: {
        caseId: boxId,
      },
      select: {
        drop_rate: true,
        itemId: true,
      },
    });
    let sum = 0;
    for (const caseItem of caseItems) {
      sum += caseItem.drop_rate;
      if (random <= sum) {
        await this.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            balance: balance - box.price,
          },
        });
        await this.prisma.userItem.create({
          data: {
            userId: userId,
            itemId: caseItem.itemId,
          },
        });
        return { itemId: caseItem.itemId };
      }
    }
  }

  async addItemInBox() {
    console.log('added item');
    await this.prisma.caseItem.create({
      data: {
        caseId: 1,
        itemId: 11,
        drop_rate: 0.05,
      },
    });
  }
}
