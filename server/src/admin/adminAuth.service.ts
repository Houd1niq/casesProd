import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthAdminDto } from './dto/AuthAdminDto';

@Injectable()
export class AdminAuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signIn(dto: AuthAdminDto): Promise<{ access_token: string }> {
    const adminCount = await this.prisma.admin.count();
    if (adminCount === 0) {
      const hashedPassword = await this.hashData(dto.password);
      await this.prisma.admin.create({
        data: {
          password: hashedPassword,
          name: dto.name,
        },
      });
    }

    const candidate = await this.prisma.admin.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (!candidate) {
      throw new ForbiddenException('Неверный логин или пароль');
    }
    const compare = await bcrypt.compare(dto.password, candidate.password);
    if (!compare) throw new ForbiddenException('Неверный логин или пароль');
    const token = await this.getTokens(candidate.id, candidate.name);
    console.log(token, 'token');
    return token;
  }

  async logout(id: number) {
    await this.prisma.admin.update({
      where: { id },
      data: {
        password: null,
      },
    });
    return { name, message: 'logged out' };
  }

  async getTokens(id: number, name: string): Promise<{ access_token: string }> {
    const [at] = await Promise.all([
      this.jwtService.signAsync(
        { id, name, role: 'admin' },
        { expiresIn: 60 * 60 * 24, secret: process.env.AC_TOKEN_SECRET },
      ),
    ]);
    return { access_token: at };
  }

  private hashData(value: string): Promise<string> {
    return bcrypt.hash(value, 5);
  }
}
