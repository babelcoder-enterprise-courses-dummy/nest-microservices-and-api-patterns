import { Expose, Transform, Type } from 'class-transformer';
import { Role } from '../role.model';
import { UserAddressDto } from './user-address.dto';
import { User } from '@prisma/client';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  image: string;

  @Expose()
  @Transform(({ value }) => {
    switch (value) {
      case Role.Admin:
        return 'Admin';
      case Role.Moderator:
        return 'Moderator';
      default:
        return 'Member';
    }
  })
  role: Role;

  @Expose()
  @Type(() => UserAddressDto)
  address: UserAddressDto;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
