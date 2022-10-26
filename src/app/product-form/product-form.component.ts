
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from '../products';
import { mimeType } from './mime-type.validator';
import { ProductSubmissionService } from '../product-submission.service';
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  img_name: any;
  filename: String = "";
  form!: FormGroup;
  shortLink: string = "";
  loading: boolean = false;
  product!: Product ;
  isLoading = false;
  private mode = "create";
  private productId!: string;

  constructor(public productService: ProductSubmissionService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      'p_name': new FormControl(),
      'p_brand': new FormControl(),
      'type': new FormControl(),
      'price': new FormControl(),
      'description': new FormControl(),
      'img_url': new FormControl(),
      'image': new FormControl(null, {validators: [Validators.required], asyncValidators: mimeType}),
      'sale': new FormControl(),
      's_price': new FormControl({value: '', disabled: true}, Validators.required),
      'season': new FormControl(),
  });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("productId")) {
        this.mode = "edit";
        this.productId = paramMap.get("productId")!;
        console.log("it had productid "+ this.productId);
        this.isLoading = true;
        this.productService.getProduct(this.productId).subscribe(productData => {
          this.isLoading = false;
          this.product = {
            id : productData._id,
            p_name: productData.p_name ,
            p_brand: productData.p_brand ,
            type: productData.type,
            price: productData.price ,
            description: productData.description ,
            img_url: productData.img_url ,
            sale: productData.sale ,
            s_price: productData.s_price ,
            season: productData.season
          };
          this.form.setValue({
            p_name: this.product.p_name ,
            p_brand: this.product.p_brand ,
            type: this.product.type,
            price: this.product.price ,
            description: this.product.description ,
            // img_url: this.product.img_url ,
            sale: this.product.sale ,
            s_price: this.product.s_price ,
            season: this.product.season,
            // image: "http://192.168.1.7:3000/uploads/"+ this.img_name
            // image: "",
            image: this.product.img_url,
            img_url: ""
          });
        });
      } else {
        this.mode = "create";
        this.productId = null!;
      }
    });
      // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if (paramMap.has("productId")) {
    //     this.mode = "edit";
    //     this.productId = paramMap.get("productId")!;
    //     this.isLoading = true;
    //     this.productService.getProduct(this.productId).subscribe(productData => {
    //       this.isLoading = false;
    //       this.product = {
    //         id : productData._id,
    //         p_name: productData.p_name ,
    //         p_brand: productData.p_brand ,
    //         type: productData.type,
    //         price: productData.price ,
    //         description: productData.description ,
    //         img_url: productData.img_url ,
    //         sale: productData.sale ,
    //         s_price: productData.s_price ,
    //         season: productData.season
    //       };
    //       this.form.setValue({
    //         p_name: this.product.p_name ,
    //         p_brand: this.product.p_brand ,
    //         type: this.product.type,
    //         price: this.product.price ,
    //         description: this.product.description ,
    //         img_url: this.product.img_url ,
    //         sale: this.product.sale ,
    //         s_price: this.product.s_price ,
    //         season: this.product.season
    //       });
    //     });
    //   } else {
    //     this.mode = "create";
    //     this.productId = null!;
    //   }
    // });
  }

  // private products: Product[] = [];

  @Output() productCreated = new EventEmitter();

  onImagePicked(event: Event){
      const file = (event.target as HTMLInputElement).files?.[0];
      console.log(file);
      // this.img_name = file;
      this.form.patchValue({
        image: file
      });
      this.form.get('image')?.updateValueAndValidity();
      console.log(this.form.value.image);

  }

  onSubmit(){
    if (this.form.invalid){
      window.alert("Invalid Details!");
      return;
    }
    this.isLoading = true;
    if(this.mode === "create"){
      // console.log(this.img_name);
      console.log("product create request generated!");
        let filename: string = this.form.value.img_url.replace(/^.*[\\\/]/, '');
        console.log(filename);
        this.productService
          .addProduct(
        this.form.value.p_name,
        this.form.value.p_brand,
        this.form.value.type,
        this.form.value.price,
        this.form.value.description,
        this.form.value.filename,
        this.form.value.sale,
        this.form.value.s_price,
        this.form.value.season,
        this.form.value.image
      )
      console.log(this.form.value.filename);
      console.log(filename);
    // console.log(this.form.value);
    this.form.reset();
    window.alert("Form Uploaded Successfully!");
  }
    else {
      console.log("product update request generated!");
      let filename: string = this.form.value.img_url.replace(/^.*[\\\/]/, '');
      console.log("Filename in update mode "+filename);
      console.log("porduct id is:  "+this.productId)
      this.productService.updateProduct(
        this.productId,
        this.form.value.p_name,
        this.form.value.p_brand,
        this.form.value.type,
        this.form.value.price,
        this.form.value.description,
        filename,
        // this.form.value.filename,
        this.form.value.sale,
        this.form.value.s_price,
        this.form.value.season,
        this.form.value.image
      );
      console.log(this.form.value.filename);
    }

    this.form.reset();
  }

  textBoxDisabled = true;

  toggleOff(){
    this.textBoxDisabled = false;
    this.form.controls['s_price'].enable();
  }
  toggleOn(){
    this.textBoxDisabled = true;
    this.form.controls['s_price'].disable();
  }

}
