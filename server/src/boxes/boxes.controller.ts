import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
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
    return await this.boxesService.rollBox(user.id, Number(boxId));
  }

  @Post('add')
  async addItemInBox() {
    return await this.boxesService.addItemInBox();
  }
}
