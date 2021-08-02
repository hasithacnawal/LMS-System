import { User } from '../core/models/user';

export class JwtAuthResponse {
  authenticationToken: string;
  userName: string;
  authUser: User;
}
