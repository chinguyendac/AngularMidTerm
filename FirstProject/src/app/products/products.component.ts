import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
     route: ActivatedRoute,
     productService: ProductService, 
     private shoppinCartService: ShoppingCartService) { 

    
    
    productService.getAll().subscribe(products => this.products = products);

    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');

      this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) :
        this.products;
    });

  }

  async ngOnInit() {
    this.subscription =  (await this.shoppinCartService.getCart())
    .subscribe(cart => this.cart = cart);
  }

ngOnDestroy() {
  this.subscription.unsubscribe();
}

}
