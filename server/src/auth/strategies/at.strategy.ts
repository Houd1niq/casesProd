import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

export type PayloadType = {
  id: string;
  email: string;
};

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      jsonWebTokenOptions: {
        maxAge: '15m',
      },
      secretOrKey: process.env.AC_TOKEN_SECRET,
    });
  }

  validate(payload: PayloadType): PayloadType {
    return payload;
  }
}
