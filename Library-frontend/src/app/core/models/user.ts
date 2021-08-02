import { Role } from './role';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  img: string;
  email: string;
  password: string;
  address: string;
  roleId: number;
  role: Role;
}
