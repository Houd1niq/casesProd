import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CronJob } from 'cron';

@Injectable()
export class UserService {
  private readonly job: CronJob;

  constructor(private prisma: PrismaService) {
    this.job = new CronJob(
      '0 0 0 * * *',
      async () => {
        await this.prisma.user.updateMany({
          where: {
            isDayStreakActive: false,
          },
          data: {
            isDayStreakActive: true,
          },
        });

        await this.prisma.user.updateMany({
          where: {
            isEmailConfirmed: false,
          },
          data: {
            confirmationCode: null,
          },
        });
      },
      null,
      true,
      'Europe/Moscow',
    );
    this.job.start();
  }

  // get public user info
  async checkIn(id: string) {
    const caseCount = await this.prisma.userItem.count({
      where: {
        userId: id,
      },
    });
    if (caseCount === 0) {
      throw new BadRequestException('You need to open at least one case');
    }

    await this.prisma.user.update({
      where: { id },
      data: {
        isDayStreakActive: false,
        dayStreak: {
          increment: 1,
        },
      },
    });
  }

  async setWallet(wallet: string, id: string) {
    console.log(wallet, id);
    return await this.prisma.user.update({
      where: { id: id },
      data: {
        wallet: wallet,
      },
    });
  }

  async getUser(id: string) {
    try {
      const userInfo = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          profile_image: true,
          user_items: {
            select: {
              id: true,
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
      return {
        ...userInfo,
        user_items: userInfo.user_items.reverse().map((item) => {
          return { ...item.item, userItemId: item.id };
        }),
      };
    } catch (e) {
      throw new BadRequestException("User doesn't exist");
    }
  }

  async setItemState(
    id: number,
    isSold: boolean,
    isObtained: boolean,
    userId: string,
  ) {
    const userItem = await this.prisma.userItem.findUnique({
      where: {
        id,
      },
      select: {
        item: {
          select: {
            price: true,
          },
        },
        userId: true,
      },
    });
    if (userItem.userId !== userId) {
      throw new ForbiddenException('You are not the owner of this item');
    }

    if (isSold) {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          balance: {
            increment: userItem.item.price,
          },
        },
      });
    }

    return await this.prisma.userItem.update({
      where: {
        id: id,
      },
      data: {
        isSold: isSold,
        isObtained: isObtained,
      },
    });
  }

  async getCount() {
    const count = await this.prisma.user.count();
    return { usersCount: count };
  }

  async changeUsername(username: string, id: string) {
    console.log(username, id);
    try {
      return await this.prisma.user.update({
        where: { id },
        data: {
          name: username,
        },
      });
    } catch (e) {
      throw new BadRequestException(
        'This username is already taken by someone else',
      );
    }
  }

  async uploadProfileImage(id: string, filePath: string) {
    return await this.prisma.user.update({
      where: { id },
      data: {
        profile_image: filePath,
      },
    });
  }

  async getProfile(id: string) {
    const userInfo = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        isEmailConfirmed: true,
        balance: true,
        wallet: true,
        user_cases: true,
        profile_image: true,
        minutesCounter: true,
        dayStreak: true,
        isDayStreakActive: true,
        isFreeCaseAvailable: true,
        user_items: {
          select: {
            id: true,
            timestamp: true,
            isSold: true,
            isObtained: true,
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
    return {
      ...userInfo,
      user_items: userInfo.user_items.reverse().map((item) => {
        return {
          ...item.item,
          timestamp: item.timestamp,
          userItemId: item.id,
          isSold: item.isSold,
          isObtained: item.isObtained,
        };
      }),
    };
  }
}
