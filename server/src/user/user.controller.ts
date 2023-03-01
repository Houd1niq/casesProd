import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { PayloadType } from '../auth/strategies';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { createWriteStream } from 'fs';
import * as fs from 'fs';

interface ImageInterface {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user/:id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }

  @Get('get-count')
  async getCount() {
    return await this.userService.getCount();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('change-username')
  async changeUsername(
    @Req() req: Request,
    @Body() body: { username: string },
  ) {
    const user = req.user as PayloadType;
    return await this.userService.changeUsername(body.username, user.id);
  }

  @Get('profile')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req: Request) {
    const user = req.user as PayloadType;
    return await this.userService.getProfile(user.id);
  }

  @Post('upload-profile-image')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() file: ImageInterface, @Req() req: Request) {
    const user = req.user as PayloadType;
    const filePath = join(__dirname, '..', '..', 'uploads', `${user.id}.jpg`);
    console.log(filePath);
    if (fs.existsSync(filePath)) {
      console.log('here');
    }
    const writeStream = createWriteStream(filePath);
    writeStream.write(file.buffer);
    writeStream.end();
    return await this.userService.uploadProfileImage(
      user.id,
      `uploads/${user.id}.jpg`,
    );
  }
}
