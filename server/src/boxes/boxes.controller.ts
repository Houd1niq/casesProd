import {
  Controller,
  Get,
  Param,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { BoxesService } from './boxes.service';
import { AuthGuard } from '@nestjs/passport';
import { PayloadType } from '../auth/strategies';
import { Request } from 'express';

@Controller('boxes')
export class BoxesController {
  constructor(private readonly boxesService: BoxesService) {}

  @Get('all')
  async getBoxes() {
    return await this.boxesService.getBoxes();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('roll/:boxId')
  async rollBox(@Req() req: Request, @Param('boxId') boxId: string) {
    const user = req.user as PayloadType;
    if (typeof user.id === 'number')
      throw new UnauthorizedException('Unauthorized');
    return await this.boxesService.rollBox(user.id, Number(boxId));
  }

  @Get('last')
  async getLastBoxes() {
    return await this.boxesService.getLastBoxes();
  }
}
