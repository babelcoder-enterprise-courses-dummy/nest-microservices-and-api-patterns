import { applyDecorators, UseGuards } from '@nestjs/common';
import { Role } from 'src/users/role.model';
import { Roles } from '../decorators/roles.decorator';
import { AccessTokenAuthGuard } from './access-token-auth.guard';
import { RolesGuard } from './roles.guard';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(AccessTokenAuthGuard, RolesGuard),
  );
}
