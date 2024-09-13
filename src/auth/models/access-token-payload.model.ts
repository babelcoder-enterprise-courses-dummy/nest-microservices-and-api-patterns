import { Role } from 'src/users/role.model';

export interface AccessTokenPayload {
  sub: number;
  role: Role;
}
