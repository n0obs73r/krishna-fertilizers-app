import { Injectable } from '@angular/core';
import { Product } from './products';
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductSubmissionService {
  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient) { }

  getProduct(){
    this.http
      .get<{ message: string; products: any }>(
        "http://localhost:3000/seeds-view"
      )
      .pipe(map((productData) => {
        return productData.products.map((product:any) => {
          return {
            id: product._id,
            p_name: product.p_name ,
            p_brand: product.p_brand ,
            type: product.type,
            price: product.price ,
            description: product.description ,
            img_url: product.img_url ,
            sale: product.sale ,
            s_price: product.s_price,
            season: product.season,
            image: File
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.products = transformedPosts;
        this.productsUpdated.next([...this.products]);
      });
      console.log(this.products)
  }
  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
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
