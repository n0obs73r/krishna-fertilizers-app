import {Injectable} from '@angular/core';
import {Product} from './products';
import {AuthData} from './authData';
import {HttpClient} from '@angular/common/http';
import {Subject} from "rxjs";
import {map} from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProductSubmissionService {
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private products: Product[] = [];
  private productsUpdated = new Subject<{ products: Product[], productCount: number }>();
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
          productCount: transformedPostData.maxProductsMachine});      });
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
      // this.http.post<{message:string}>('http://localhost:3000/product-form', productData)
      this.http.post<{message:string}>('http://192.168.1.7:3000/product-form', productData)
      // this.http.post<{message:string}>('http://krishnafertilizers-env-3.eba-3pw26wgu.ap-northeast-1.elasticbeanstalk.com/product-form', productData)
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
