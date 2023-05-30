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
        dayStreak: true,
        balance: true,
        profit_multiplier: true,
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
    let balance: number = Number.parseFloat(String(user.balance));

    if (user.dayStreak === 7 && boxId === 1) {
      balance += box.price;
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          dayStreak: 0,
        },
      });
    }
    if (!box) throw new BadRequestException('ConfigureBoxPage not found');
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
    const modifiedCaseItems = this.changeDropRate(
      caseItems,
      user.profit_multiplier,
    );

    for (const caseItem of modifiedCaseItems) {
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
        const userCaseCounter = await this.prisma.userItem.count({
          where: {
            userId,
          },
        });
        if (userCaseCounter === 1) {
          const update = await this.prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              isDayStreakActive: true,
            },
          });
          console.log(update);
        }
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

  changeDropRate(
    probabilities: { itemId: number; drop_rate: number }[],
    MULTIPLIER: number,
  ): { itemId: number; drop_rate: number }[] {
    const average = 1 / probabilities.length;
    const probabilitiesObj = probabilities.reduce(
      (acc: { [key: number]: number }, curr) => {
        const key = curr;
        if (!acc[key.drop_rate]) {
          acc[key.drop_rate] = 1;
        } else {
          acc[key.drop_rate] += 1;
        }
        return acc;
      },
      {},
    );

    let uniqModifiedProbArr = Object.entries(probabilitiesObj).map(
      ([key, n]) => {
        const prob = Number(key);
        const coeff = average / prob;
        if (prob > average)
          return [prob / (1 + (MULTIPLIER - 1) * (1 - coeff)), n];
        else return [prob * (1 + (MULTIPLIER - 1) * coeff), n];
      },
    );
    const newSum = uniqModifiedProbArr.reduce((acc, [prob, n]) => {
      return acc + prob * n;
    }, 0);

    uniqModifiedProbArr = uniqModifiedProbArr.map(([prob, n]) => {
      return [prob / newSum, n];
    });

    const resArr = [];
    for (let i = 0; i < uniqModifiedProbArr.length; i++) {
      const [prob, n] = uniqModifiedProbArr[i];
      for (let j = 0; j < n; j++) {
        resArr.push(prob);
      }
    }
    for (let i = 0; i < resArr.length; i++) {
      probabilities[i].drop_rate = resArr[i];
    }
    console.log(probabilities);
    return probabilities;
  }
}
