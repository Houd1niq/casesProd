import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
      include: {
        user_cases: true,
        user_items: true,
      },
    });
    return {
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
      isEmailConfirmed: userInfo.isEmailConfirmed,
      balance: userInfo.balance,
      wallet: userInfo.wallet,
      user_cases: userInfo.user_cases,
      user_items: userInfo.user_items,
      user_profile_image: userInfo.profile_image,
    };
  }
}
