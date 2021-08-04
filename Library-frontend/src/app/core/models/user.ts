import { Role } from './role';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  img: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  roleId: number;
  role: Role;
  createdAt: Date;
}
