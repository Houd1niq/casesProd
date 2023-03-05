import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(readonly prisma: PrismaService) {}

  async changeUser(body: {
    id: string;
    data: {
      balance: number;
      profitMultiplier: number;
    };
  }) {
    return await this.prisma.user.update({
      where: {
        id: body.id,
      },
      data: {
        balance: body.data.balance,
        profit_multiplier: body.data.profitMultiplier,
      },
    });
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        balance: true,
        profit_multiplier: true,
      },
    });
    return users;
  }

  async deleteCaseItem(id: number) {
    return await this.prisma.caseItem.delete({
      where: {
        id,
      },
    });
  }

  async changeDropRate(body: { id: number; dropRate: number }) {
    return await this.prisma.caseItem.update({
      where: {
        id: body.id,
      },
      data: {
        drop_rate: body.dropRate,
      },
    });
  }

  async addCaseItem(
    caseId: number,
    body: { itemId: number; dropRate: number },
  ) {
    return await this.prisma.caseItem.create({
      data: {
        case: {
          connect: {
            id: Number.parseFloat(String(caseId)),
          },
        },
        item: {
          connect: {
            id: body.itemId,
          },
        },
        drop_rate: body.dropRate,
      },
    });
  }

  async getAllBoxes() {
    const cases = await this.prisma.case.findMany();
    return cases;
  }

  async getAllItems() {
    return await this.prisma.item.findMany();
  }

  async getCaseItems(caseId: string) {
    const caseItems = await this.prisma.caseItem.findMany({
      where: {
        caseId: Number(caseId),
      },
      select: {
        id: true,
        drop_rate: true,
        item: true,
      },
    });
    return caseItems;
  }

  async addBox(path: string, name: string, price: number) {
    return await this.prisma.case.create({
      data: {
        name,
        price,
        image: path,
      },
    });
  }

  async addItem(path: string, name: string, price: number) {
    console.log(path, name, price);
    return await this.prisma.item.create({
      data: {
        name,
        price,
        image: path,
      },
    });
  }
}
