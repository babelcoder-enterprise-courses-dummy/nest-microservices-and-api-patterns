import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import ms from 'ms';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { omit } from 'lodash';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateProfileWithTokens(user: User) {
    const refreshToken = this.jwtService.sign(
      {},
      {
        privateKey: process.env.REFRESH_TOKEN_SECRET_KEY,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      },
    );
    const accessToken = this.jwtService.sign(
      { sub: user.id, role: user.role },
      {
        privateKey: process.env.ACCESS_TOKEN_SECRET_KEY,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      },
    );

    await this.usersService.updateRefreshToken(user.id, refreshToken);

    return {
      profile: user,
      accessToken,
      refreshToken,
      expiresIn: +new Date() + ms(process.env.ACCESS_TOKEN_EXPIRES_IN),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) return null;

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    return isPasswordMatch ? omit(user, 'password') : null;
  }

  getProfile(userId: number) {
    return this.usersService.findById(userId);
  }

  updateProfile(userId: number, form: UpdateUserDto) {
    return this.usersService.updateUser(userId, form);
  }

  logout(userId: number) {
    return this.usersService.updateRefreshToken(userId, null);
  }
}
