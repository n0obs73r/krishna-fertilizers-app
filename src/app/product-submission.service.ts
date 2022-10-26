import {Injectable} from '@angular/core';
import {Product} from './products';
import {AuthData} from './authData';
import {HttpClient} from '@angular/common/http';
import {Subject} from "rxjs";
import {map} from 'rxjs/operators';
import {Router} from "@angular/router";
import axios from "axios";
import {response} from "express";

@Injectable({
  providedIn: 'root'
})
export class ProductSubmissionService {
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private products: Product[] = [];
  private productsUpdated = new Subject<{ products: Product[], productCount: number }>();
  private productsUpdatedWithoutCount = new Subject<Product[]>();
  private token: string = "";

  constructor(private http: HttpClient, private router: Router) { }


  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getProducts(productsPerPage: number, currentPage: number){
    const queryParamsProduct =`?pagesize=${productsPerPage}&page=${currentPage}`;
    console.log(queryParamsProduct)
    this.http
      .get<{ message: string; products: any; maxProducts: number}>(
        "http://192.168.1.7:3000/product-management" + queryParamsProduct
      )
      .pipe(map((productData) => {
        return{ products: productData.products.map((product:any) => {
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
          }),
          maxProducts: productData.maxProducts
        };
      }))
      .subscribe(transformedPostData => {
        this.products = transformedPostData.products;
        this.productsUpdated.next({ products:[...this.products] ,
          productCount: transformedPostData.maxProducts});
      });
    console.log(this.products)
  }

  deleteProduct(productId: string) {
    return this.http
      .delete("http://192.168.1.7:3000/edit/" + productId);
      // .delete("http://192.168.1.7:3000/product-form/edit/" + productId);
  }

  getProduct(id: string) {
    return this.http.get<{
      _id : string,
      p_name: string ,
      p_brand: string ,
      type: string,
      price: string ,
      description: string ,
      img_url: string ,
      sale: string ,
      s_price: string ,
      season: string,
      image: File
    }>("http://192.168.1.7:3000/edit/" + id);
    // }>("http://192.168.1.7:3000/product-form/edit/" + id);
  }


  getSale(){
    this.http
      .get<{ message: string; products: any; }>(
        "http://192.168.1.7:3000"
      )
      .pipe(map((productData) => {
        return {
          products: productData.products.map((products: any) => {
            return {
              id: products._id,
              p_name: products.p_name,
              p_brand: products.p_brand,
              type: products.type,
              price: products.price,
              description: products.description,
              img_url: products.img_url,
              sale: products.sale,
              s_price: products.s_price,
              season: products.season,
              image: File
            };
          }),
          maxProducts: 20
        }
      }))
      .subscribe(transformedProducts => {
        console.log(transformedProducts);
          this.products = transformedProducts.products;
          this.productsUpdated.next({products:[...this.products],  productCount: transformedProducts.maxProducts});
      });
    // console.log(this.products);
  }



  getSeeds(productsPerPage: number, currentPage: number){
    const queryParamsSeed =`?pagesize=${productsPerPage}&page=${currentPage}`;
    console.log(queryParamsSeed)
    this.http
      .get<{ message: string; products: any; maxProductsSeeds: number}>(
        "http://192.168.1.7:3000/seeds-view" + queryParamsSeed
      )
      .pipe(map((productData) => {
        return{ products: productData.products.map((product:any) => {
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
        }),
        maxProductsSeeds: productData.maxProductsSeeds
        };
      }))
      .subscribe(transformedPostData => {
        this.products = transformedPostData.products;
        this.productsUpdated.next({ products:[...this.products] ,
        productCount: transformedPostData.maxProductsSeeds});
      });
    console.log(this.products)
  }

  ////////////////////////////////fertilizers-view//////////////////////////////////


  getFertilizers(productsPerPage: number, currentPage: number){
    const queryParamsFertilizer =`?pagesize=${productsPerPage}&page=${currentPage}`;
    console.log(queryParamsFertilizer);
    this.http
      .get<{ message: string; products: any; maxProductsFertilizers: number}>(
        "http://192.168.1.7:3000/fertilizers-view" + queryParamsFertilizer
      )
      .pipe(map((productData) => {
        return{ products: productData.products.map((product:any) => {
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
        }),
          maxProductsFertilizers: productData.maxProductsFertilizers
      };
      }))
      .subscribe(transformedPostData => {
        this.products = transformedPostData.products;
        this.productsUpdated.next({ products:[...this.products] ,
          productCount: transformedPostData.maxProductsFertilizers});
        console.log(this.products);
      });
    console.log(this.products)
  }

  //////////////////////////////////machinery view/////////////////////////////////////////////

  getMachinery(productsPerPage: number, currentPage: number){
    const queryParamMachines =`?pagesize=${productsPerPage}&page=${currentPage}`;
    console.log(queryParamMachines)
    this.http
      .get<{ message: string; products: any; maxProductsMachine: number}>(
        "http://192.168.1.7:3000/machinery-view" + queryParamMachines
      )
      .pipe(map((productData) => {
        return{ products: productData.products.map((product:any) => {
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
        }),
        maxProductsMachine: productData.maxProductsMachine
      };
      }))
      .subscribe(transformedPostData => {
        this.products = transformedPostData.products;
        this.productsUpdated.next({ products:[...this.products] ,
          productCount: transformedPostData.maxProductsMachine});
      });
    console.log(this.products)
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getProductUpdateListenernoCount(){
    return this.productsUpdatedWithoutCount.asObservable();
  }

  public updateProduct(
    id: string,
    p_name: string ,
    p_brand: string ,
    type: string,
    price: string ,
    description: string ,
    img_url: string ,
    sale: string ,
    s_price: string,
    season: string,
    image: File | string
  ) {
    console.log(id);
    console.log(img_url);
    let productData2: Product | FormData | any;
    if (typeof image === "object") {
      productData2 = new FormData();
      productData2.append("id", id);
      productData2.append("p_name", p_name);
      productData2.append("p_brand", p_brand);
      productData2.append("type", type);
      productData2.append("price", price);
      productData2.append("description", description);
      productData2.append("img_url", img_url);
      productData2.append("sale", sale);
      productData2.append("s_price", s_price);
      productData2.append("season", season);
      productData2.append("image", image, img_url);
      console.log("Image is an Object : " + image + " " + img_url);
    } else {
      productData2 = {
        id: id,
        p_name: p_name,
        p_brand: p_brand,
        type: type,
        price: price,
        description: description,
        img_url: img_url,
        sale: sale,
        s_price: s_price,
        season: season,
        // image: image
      }
      console.log("Image String : " + image + " " + img_url);
    }
    // this.http.put<{ token: string }>('http://192.168.1.7:3000/product-form/edit/' + id, productData, )
    // this.http.put<{ token: string }>('http://192.168.1.7:3000/edit/' + id , {} ,productData2)   //////////// id immutable error
    this.http.put<{ token: string }>('http://192.168.1.7:3000/edit/' + id,productData2)       ///////////////////updates but auth failed
      .subscribe(response => {
        console.log(response);
        this.router.navigate(["/"]);
      });
      // .subscribe((response) => {
      //   // this.router.navigate(['/product-management']).then(r => console.log(r));
      //   const token = response.token;
      //   console.log(response.token);
      //   this.token = response.token;
      //   if(token) {
      //     this.isAuthenticated = true;
      //     this.router.navigate(['/']);
      //   }
      //   this.authStatusListener.next(true);
      // });
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
      // console.log(img_url); //undefined
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
      // this.http.post<{message:string}>('http://localhost:3000/product-form', productData)
      this.http.post<{message:string}>('http://192.168.1.7:3000/product-form', productData)
      // this.http.post<{message:string}>('http://krishnafertilizers-env-3.eba-3pw26wgu.ap-northeast-1.elasticbeanstalk.com/product-form', productData)
        // this.http.post<{message:string}>('https://krishna-fertilizers.web.app/product-form', productData)
        // this.http.post<{message:string}>('https://krishna-fertilizers.web.app/product-form', productData)
        .subscribe((responseData) =>{
          const product: Product = {
            id: "1",
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


    createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password}
      this.http.post("http://192.168.1.7:3000/signup", authData)
        .subscribe(response => {
          console.log(response);
        })
    }

    loginUser(email: string, password: string) {
      const authData: AuthData = {email: email, password: password}
      this.http.post<{token: string}>("http://192.168.1.7:3000/login", authData)
        .subscribe(response => {
          console.log(response);
          const token = response.token;
          this.token = response.token;
          if(token) {
            this.isAuthenticated = true;
            this.router.navigate(['/']);
          }
          this.authStatusListener.next(true);
        })
  }


}
