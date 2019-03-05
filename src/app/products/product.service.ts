import { Injectable } from "@angular/core";
import { IProduct } from "./products";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productUrl = 'api/products/products.json';
    constructor(private http: HttpClient){

    }

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data=> console.log('ALL :'+JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getProduct(id: number): Observable<IProduct> {
        return this.getProducts()
            .pipe(map((products: IProduct[]) => products.find(p => p.productId === id)));
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if(err.error instanceof ErrorEvent) {
            errorMessage = `An Error Occured: ${err.error.message}`;
        } else {
            errorMessage = `Server retirned code : ${err.status}, error message is: ${err.error.message}`
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}