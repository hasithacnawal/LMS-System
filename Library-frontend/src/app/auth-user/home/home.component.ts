import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Book } from 'src/app/core/models/book';
import { BooksService } from 'src/app/core/service/books.service';
import { ProductsService } from 'src/app/core/service/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any;
  totalcartvalue = 0;
  value;
  conditionToDisaply = false;
  orders = [];

  constructor(
    private productservice: BooksService,
    public snackBar: MatSnackBar
  ) {}

  openSnackBar() {}

  ngOnInit() {
    this.products = this.productservice.getDummy();
    console.log(this.products);
    // this.productservice.orders.push(this.orders )
  }

  //add to cart method
  addToCart(indexValue, propductId) {
    //snackbar notification

    if (this.products[indexValue].quantity != 0) {
      this.snackBar.open('  Added to Cart', this.products[indexValue].name, {
        duration: 2000,
      });
    } else if (this.products[indexValue].quantity == 0) {
      this.snackBar.open(
        '  Product Unavailable',
        this.products[indexValue].name,
        { duration: 2000 }
      );
    }

    //conditions to display +  and - buttons

    //Add to cart

    this.totalcartvalue += 1;
    console.log(this.totalcartvalue + 'cart value dsgsg');
    let count = 1;
    let push = true;
    console.log(indexValue + '   ' + propductId);
    if (this.products[indexValue].quantity == 0) {
      return;
    }

    for (let ords of this.productservice.orders) {
      if (ords.indexVal == indexValue) {
        console.log('index value already');
        ords.quantity++;
        push = false;
        this.conditionToDisaply = true;
      }
    }
    if (push) {
      this.productservice.orders.push({
        indexVal: indexValue,
        quantity: count,
      });
      this.conditionToDisaply = true;
    }
    this.products[indexValue].quantity--;

    this.productservice.sendTotal(this.totalcartvalue);

    //send to service
  }

  //remove from cart

  removeFromCart(indexValue, propductId) {
    this.totalcartvalue -= 1;
    this.products[indexValue].quantity++;
    for (let ord of this.productservice.orders) {
      if (ord.indexVal == indexValue) {
        ord.quantity -= 1;
      }
    }

    this.snackBar.open(
      '  Removed From Cart  ',
      this.products[indexValue].name,
      { duration: 2000 }
    );
    this.productservice.sendTotal(this.totalcartvalue);
  }

  //get quanity

  getQuantity(i) {
    for (let orders of this.productservice.orders) {
      if (orders.indexVal == i) {
        return orders.quantity;
      }
    }
  }

  //button to see orders
  show() {
    //  this.productservice.sendOrders(this.orders )
    console.log(this.productservice.orders);
  }
}
