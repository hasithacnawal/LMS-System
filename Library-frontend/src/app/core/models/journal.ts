import { User } from './user';

export class Journal {
  id: number;
  img: string;
  title: string;
  type: string;
  file: string;
  description: string;
  createdAt: Date;
  createrId: number;
  Creater: User;
}
