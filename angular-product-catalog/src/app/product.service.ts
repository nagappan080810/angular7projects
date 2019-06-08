import { Injectable } from '@angular/core';
import { Product } from './product';
import { PRODUCTS } from './mock-products';
import { Logger } from './logger.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const HTTPOPTIONS = {
      headers: new HttpHeaders({
        'Authorization': 'Basic YWRtaW46YWRtaW4=',
      })
    };

@Injectable({
    providedIn: 'root',
})
export class ProductService {

    constructor(private logger: Logger, private httpclient: HttpClient) { }
    getProducts(): Observable<any> {
        this.logger.log("message is getting logged successfully");
        return this.httpclient.get("http://localhost:8080/resteasyexamples/rest/products", HTTPOPTIONS);
    }
    deleteProduct(productId) {
        this.httpclient.delete("http://localhost:8080/resteasyexamples/rest/products/"+productId, HTTPOPTIONS).subscribe((data)=>console.log(data));
    }
    createOrEditProduct(product): Observable<any> {
        if (product.id==0) {
            return this.httpclient.post("http://localhost:8080/resteasyexamples/rest/products", {"product": product}, HTTPOPTIONS);
        } else {
            return this.httpclient.put("http://localhost:8080/resteasyexamples/rest/products/"+product.id, {"product": product}, HTTPOPTIONS);
        }
    }
}