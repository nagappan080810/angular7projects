import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { PRODUCTS } from '../mock-products';
import { ProductService } from '../product.service';
import { Logger } from '../logger.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = PRODUCTS;//takes the mock products and display the products for view.

  selectedProduct: Product;//On click of the card, it takes that product to selectedProduct variable.


  constructor(private productService: ProductService, private logger: Logger) {
    this.selectedProduct = null;
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((response: any) => {
                                                                     this.products = [];
                                                                     response.map((productelem)=>{
                                                                        this.products.push(productelem.product);
                                                                     });
                                                                     console.log(this.products);
                                                                    });
  }

  //when click on product card, the selectedProduct is cached by the class member.
  onSelect(product: Product) : void {
    console.log("product selected");
    this.selectedProduct = product;
  }

  //while clicking on add product, the product entity created with available id and pushed to products array.
  onAdd(product: Product): void {
    console.log("product added");
    product = {id: 0, name: '', qty: 0, brand: '', desc: ''};
    this.selectedProduct = product;
    this.products.push(product);
  }

  //while searching, the product name search field value given will be searched in each product name field.
  onSearch(searchText: string) : void {
    alert(searchText);
    this.products = this.products.filter(p1 => p1.name.indexOf(searchText)>=0);
  }

  //while delete is clicked, the product will be removed from the products modal.
  onDelete(product: Product) : void {
    this.products = this.products.filter(p1 => p1!=product);
    this.productService.deleteProduct(product.id);
  }

  //as the product is double binded, when edit or add product is done, it automatically applies to the products model so unselecting the selectedproduct alone is fine..
  onSubmit(product: Product) {
    console.log(product);
    this.productService.createOrEditProduct(product).subscribe((response:any)=>{
        product.id = response;
    });
    this.selectedProduct = null;
  }
}