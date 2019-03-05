import { Component, OnInit } from "@angular/core";
import { IProduct } from "./products";
import { ProductService } from "./product.service";


@Component({
    // selector: 'app-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{
    
    constructor(private productService: ProductService){}

    pageTitle: string = 'ACME Product List';
    imageWidth: number = 30;
    imageMargin: number = 2;
    showImage: boolean = false;
    filteredProducts: IProduct[];
    products: IProduct[] = [];
    _listFilter: string;
    errorMessage: string;

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this._listFilter ? this.performFilter(this._listFilter) : this.products;
    }


ngOnInit(): void {
        console.log('In OnInit Method ')
        this.productService.getProducts().subscribe(
            products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error => this.errorMessage = <any>error
        );
    }

toggleImage(){
    this.showImage = !this.showImage;
}

performFilter(filterBy: string){
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product : IProduct)=> product.productName.toLocaleLowerCase().indexOf(filterBy)!= -1);
}

onRatingClicked(message: string): void {
    this.pageTitle = 'Product List :' + message;
}
}