import { Component, OnInit } from '@angular/core';
import { IProduct } from './products';
import { ProductService } from "./product.service";
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = 'Product Detail';
  product: IProduct;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { 
    console.log('######', this.route.snapshot.paramMap.get('id'));
    let id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    this.getProduct(id);
  }

  getProduct(id: number) {
    console.log('FETCHING THE PRODUCT');
    this.productService.getProduct(id).subscribe(
        product => this.product = product,
        error => this.errorMessage = <any>error);
  }

  ngOnInit() {
    
    // this.product = {
    //   "productId": 1,
    //   "productName": "Leaf Rake",
    //   "productCode": "GDN-0011",
    //   "releaseDate": "March 19, 2016",
    //   "description": "Leaf rake with 48-inch wooden handle.",
    //   "price": 19.95,
    //   "starRating": 3.2,
    //   "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
    //   }
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  onRatingClicked(message: string): void {
        this.pageTitle = 'Product Detail: ' + message;
    }

}
