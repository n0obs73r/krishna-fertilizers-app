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
    price: string ,
    description: string ,
    img_url: string ,
    sale: string ,
    s_price: string,
    season: string,
    image: File
    ){
      console.log(img_url); //undefined
      const productData = new FormData();
      productData.append("id", "1");
      productData.append("p_name", p_name);
      productData.append("p_brand", p_brand);
      productData.append("type", type);
      productData.append("price",price);
      productData.append("description", description);
      productData.append("img_url", img_url);
      productData.append("sale", sale);
      productData.append("s_price", s_price );
      productData.append("season", season);
      productData.append("image", image, img_url);
      // const product: Product = {
      //   id: 1,
      //   p_name: p_name,
      //   p_brand: p_brand,
      //   type: type,
      //   price: price,
      //   description: description,
      //   img_url: img_url,
      //   sale: sale,
      //   s_price: s_price,
      //   season: season
      //   };
      this.http.post<{message:string}>('http://localhost:3000/product-form', productData)
        // this.http.post<{message:string}>('https://krishna-fertilizers.web.app/product-form', productData)
        // this.http.post<{message:string}>('https://krishna-fertilizers.web.app/product-form', productData)
        .subscribe((responseData) =>{
          const product: Product = {
            id: 1,
            p_name: p_name,
            p_brand: p_brand,
            type: type,
            price: price,
            description: description,
            img_url: img_url,
            sale: sale,
            s_price: s_price,
            season: season,
            };
          console.log(responseData.message);
          this.products.push(product);
        });
    //     const product: Product = {
    //         id: 1,
    //         p_name: p_name,
    //         p_brand: p_brand,
    //         type: type,
    //         price: price,
    //         description: description,
    //         img_url: img_url,
    //         sale: sale,
    //         s_price: s_price,
    //         season: season,
    //         };
    //       this.products.push(product);
    }

}
