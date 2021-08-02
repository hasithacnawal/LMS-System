import { Category } from './category';

export class Book {
  id: number;
  img: string;
  title: string;
  author: string;
  year: number;
  no_of_copies: number;
  category: Category;
}
