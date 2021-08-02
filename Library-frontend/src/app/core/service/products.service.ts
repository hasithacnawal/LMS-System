import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ProductsService {
  public totalSubject = new Subject();
  public orderSubject = new Subject();
  constructor() {}

  orders = [];

  products = [
    {
      id: '0',
      name: 'Carrot',
      quantity: 2,
      price: 12,
      url: 'https://www.sciencedaily.com/images/2008/07/080722102723_1_540x360.jpg',
    },
    {
      id: '1',
      name: 'Apple',
      quantity: 10,
      price: 12,
      url: 'https://www.sciencedaily.com/images/2008/07/080722102723_1_540x360.jpg',
    },
    {
      id: '2',
      name: 'Vanilla',
      quantity: 12,
      price: 25,
      url: 'https://www.sciencedaily.com/images/2008/07/080722102723_1_540x360.jpg',
    },
    {
      id: '3',
      name: 'Vanilla',
      quantity: 12,
      price: 25,
      url: 'https://www.sciencedaily.com/images/2008/07/080722102723_1_540x360.jpg',
    },
  ];

  //products end

  sendTotal(totalVal) {
    this.totalSubject.next(totalVal);
  }

  //orders

  // sendOrders(orders)
  //   {

  //     this.orderSubject.next(orders)
  //     console.log(orders + "from service")
  //   }
}
