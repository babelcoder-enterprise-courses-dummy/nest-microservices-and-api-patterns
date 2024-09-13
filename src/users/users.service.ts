import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/core/services/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { rm } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByRefreshToken(refreshToken: string) {
    return this.prisma.user.findUnique({ where: { refreshToken } });
  }

  async createUser(form: CreateUserDto) {
    const { password, ...rest } = form;
    const passwordHash = await bcrypt.hash(password, 12);

    return this.prisma.user.create({
      data: {
        ...rest,
        password: passwordHash,
      },
    });
  }

  async updateUser(userId: number, form: UpdateUserDto) {
    const existingUser = await this.findById(userId);
    const { password, address, ...rest } = form;
    if (existingUser.image) {
      await rm(join(__dirname, '../../uploads/users', existingUser.image), {
        force: true,
      });
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...rest,
        password: password ? await bcrypt.hash(password, 12) : undefined,
        address: address
          ? {
              create: address,
            }
          : undefined,
      },
      include: {
        address: true,
      },
    });
  }

  updateRefreshToken(id: number, newToken: string | null) {
    return this.prisma.user.update({
      where: { id },
      data: {
        refreshToken: newToken,
      },
    });
  }
}
