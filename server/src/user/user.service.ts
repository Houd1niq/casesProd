import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // get public user info
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
          return { ...item.item };
        }),
      };
    } catch (e) {
      throw new BadRequestException("User doesn't exist");
    }
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
        dayStrak: true,
        user_items: {
          select: {
            timestamp: true,
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
        return { ...item.item, timestamp: item.timestamp };
      }),
    };
  }
}
