import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RtStrategy.extractJwtFromCookie,
      ]),
      ignoreExpiration: false,
      jsonWebTokenOptions: {
        maxAge: '30d',
      },
      secretOrKey: process.env.RT_TOKEN_SECRET,
    });
  }
  validate(payload: any) {
    return payload;
  }

  private static extractJwtFromCookie(req: Request): string | null {
    if (req.headers.cookie) {
      console.log('here');
      const rt = req.headers.cookie.split('=')[1];
      if (rt) {
        return rt;
      }
    }
    return null;
  }
}
