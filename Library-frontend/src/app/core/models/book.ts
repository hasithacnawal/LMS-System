import { Category } from './category';

export class Book {
  id: number;
  img: string;
  title: string;
  type: string;
  description: string;
  author: string;
  year: number;
  stockCount: number;
  category: Category;
  authorId: number;
  categoryId: number;
}
