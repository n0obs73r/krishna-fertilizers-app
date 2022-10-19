import { Injectable } from '@angular/core';
import { Product } from './products';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductSubmissionService {

  constructor(private http: HttpClient) { }

  
  private products: Product[] = [];

  getProduct(){
    return [...this.products];
  }

  public addProduct( 
    p_name: string ,
    p_brand: string ,
    type: string,
    price: number ,
    description: string ,
    img_url: string ,
    sale: boolean ,
    s_price: number,
    season: string
    ){
      const product: Product = {
        id: 1,
        p_name: p_name,
        p_brand: p_brand,
        type: type,
        price: price,
        description: description,
        sale: sale,
        sale_price: s_price,
        season: season,
        img_url: img_url
        };
        this.http.post<{message:string}>('http://localhost:3000/product-form', product)
        .subscribe((responseData) =>{
          console.log(responseData.message);
          this.products.push(product);
        });
        
    }

}
