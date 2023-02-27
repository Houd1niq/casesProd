import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';
import { TokenTypes } from './types';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from './email.service';
import { nanoid } from 'nanoid';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async confirmEmail(
    email: string,
    code: string,
  ): Promise<{ isEmailConfirmed: boolean; message: string }> {
    const candidate = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!candidate) {
      throw new ForbiddenException('Пользователь не найден');
    }
    if (candidate.isEmailConfirmed) {
      return { isEmailConfirmed: true, message: 'Почта уже подтверждена' };
    }
    if (candidate.confirmationCode !== code) {
      throw new ForbiddenException('Неверный код подтверждения');
    }
    await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        isEmailConfirmed: true,
        confirmationCode: null,
      },
    });
    return { isEmailConfirmed: true, message: 'Почта подтверждена' };
  }

  async signIn(dto: AuthDto): Promise<TokenTypes> {
    const candidate = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!candidate) {
      throw new ForbiddenException('Неверный логин или пароль');
    }
    const compare = await bcrypt.compare(dto.password, candidate.password);
    if (!compare) throw new ForbiddenException('Неверный логин или пароль');
    const tokens = await this.getTokens(candidate.id, candidate.email);
    await this.updateHashRtInDB(candidate.email, tokens.refresh_token);
    return tokens;
  }

  async signUp(dto: RegisterDto): Promise<TokenTypes> {
    const hash = await this.hashData(dto.password);
    try {
      const confirmationCode = this.generateConfirmationCode();
      const id = nanoid(8);
      const newUser = await this.prisma.user.create({
        data: {
          id,
          name: dto.name,
          email: dto.email,
          password: hash,
          isEmailConfirmed: false,
          confirmationCode,
        },
      });
      await this.emailService.sendConfirmationCode(dto.email, confirmationCode);
      const tokens = await this.getTokens(newUser.id, newUser.email);
      await this.updateHashRtInDB(newUser.email, tokens.refresh_token);
      return tokens;
    } catch (e) {
      console.log(e);
      throw new ForbiddenException(
        'Пользователь с такими логином уже существует',
      );
    }
  }

  async logout(email: string) {
    await this.prisma.user.update({
      where: { email },
      data: {
        hashedRT: null,
      },
    });
    return { email, message: 'logged out' };
  }

  async refresh(id: string, email: string, rt: string) {
    const candidate = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!candidate || !candidate.hashedRT) {
      throw new ForbiddenException('Access denied');
    }
    const comparedRt = await bcrypt.compare(rt, candidate.hashedRT);
    if (!comparedRt) throw new ForbiddenException('Access denied');
    const tokens = await this.getTokens(id, email);
    await this.updateHashRtInDB(email, tokens.refresh_token);
    return tokens;
  }

  async updateHashRtInDB(email: string, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: { email },
      data: { hashedRT: hash },
    });
  }

  async getTokens(id: string, email: string): Promise<TokenTypes> {
    const [rt, at] = await Promise.all([
      this.jwtService.signAsync(
        { id, email },
        { expiresIn: 60 * 60 * 24 * 7, secret: process.env.RT_TOKEN_SECRET },
      ),
      this.jwtService.signAsync(
        { id, email },
        { expiresIn: 60 * 60, secret: process.env.AC_TOKEN_SECRET },
      ),
    ]);
    return { refresh_token: rt, access_token: at };
  }

  private hashData(value: string): Promise<string> {
    return bcrypt.hash(value, 5);
  }

  // function that generates a random number sequence of 6 digits
  private generateConfirmationCode(): string {
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += Math.floor(Math.random() * 10);
    }
    return code;
  }
}
