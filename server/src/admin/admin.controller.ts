import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AdminAuthService } from './adminAuth.service';
import { AuthAdminDto } from './dto/AuthAdminDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AdminService } from './admin.service';

type AdminPayloadType = {
  id: number;
  name: string;
  role: string;
};

@Controller('admin')
export class AdminController {
  constructor(
    readonly adminAuthService: AdminAuthService,
    readonly adminService: AdminService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('change-user')
  async changeUser(
    @Body()
    body: {
      id: string;
      data: {
        balance: number;
        profitMultiplier: number;
      };
    },
    @Req() req: Request,
  ) {
    const user = req.user as AdminPayloadType;
    if (user.role !== 'admin')
      throw new ForbiddenException("You don't have access");
    return await this.adminService.changeUser(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-all-users')
  async getUsers(@Req() req: Request) {
    const user = req.user as AdminPayloadType;
    if (user.role !== 'admin')
      throw new ForbiddenException("You don't have access");
    return await this.adminService.getAllUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-all-boxes')
  async getBoxes(@Req() req: Request) {
    const user = req.user as AdminPayloadType;
    console.log(user);
    if (user.role !== 'admin')
      throw new ForbiddenException("You don't have access");
    return await this.adminService.getAllBoxes();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('case-items/:caseId')
  async getCaseItems(@Param('caseId') caseId: string, @Req() req: Request) {
    const user = req.user as AdminPayloadType;
    if (user.role !== 'admin')
      throw new ForbiddenException("You don't have access");
    return await this.adminService.getCaseItems(caseId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('change-drop-rate')
  async changeDropRate(
    @Body() body: { id: number; dropRate: number },
    @Req() req: Request,
  ) {
    const user = req.user as AdminPayloadType;
    if (user.role !== 'admin')
      throw new ForbiddenException("You don't have access");
    return await this.adminService.changeDropRate(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete-case-item/:id')
  async deleteCaseItem(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as AdminPayloadType;
    if (user.role !== 'admin')
      throw new ForbiddenException("You don't have access");
    return await this.adminService.deleteCaseItem(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add-case-item')
  async addCaseItem(
    @Body() body: { caseId: number; itemId: number; dropRate: number },
    @Req() req: Request,
  ) {
    const user = req.user as AdminPayloadType;
    if (user.role !== 'admin')
      throw new ForbiddenException("You don't have access");
    return await this.adminService.addCaseItem(body.caseId, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-all-items')
  async getItems(@Req() req: Request) {
    const user = req.user as AdminPayloadType;
    if (user.role !== 'admin')
      throw new ForbiddenException("You don't have access");
    return await this.adminService.getAllItems();
  }

  @Post('signin')
  @HttpCode(HttpStatus.CREATED)
  async signIn(@Body() dto: AuthAdminDto, @Res() res: Response) {
    const token = await this.adminAuthService.signIn(dto);
    return res.send({ accessToken: token.access_token });
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Req() req: Request) {
    const user = req.user as AdminPayloadType;
    const id = Number(user.id);
    return await this.adminAuthService.logout(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add-box')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/boxes',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async addBox(@UploadedFile() file, @Body() body, @Req() req: Request) {
    const admin = req.user as AdminPayloadType;
    if (admin.role !== 'admin') throw new UnauthorizedException('Нет доступа');
    console.log('next');
    const path: string = file.destination.slice(2) + '/' + file.filename;
    const price = Number(body.price);
    const name: string = body.name;
    await this.adminService.addBox(path, name, price);
    return { message: 'Файл успешно загружен' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add-item')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/items',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async addItem(@UploadedFile() file, @Body() body, @Req() req: Request) {
    const admin = req.user as AdminPayloadType;
    console.log(admin);
    const path: string = file.destination.slice(2) + '/' + file.filename;
    const price = Number(body.price);
    const name: string = body.name;
    await this.adminService.addItem(path, name, price);
    return { message: 'Файл успешно загружен' };
  }
}
