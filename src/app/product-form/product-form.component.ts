
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product, products } from '../products';
import { mimeType } from './mime-type.validator';
import { ProductSubmissionService } from '../product-submission.service';

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
  loading: boolean = false; // Flag variable
  // file: File = null;

  constructor(public productService: ProductSubmissionService) {}

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
    else{
      // console.log(this.img_name);
        var filename: string = this.form.value.img_url.replace(/^.*[\\\/]/, '');
        console.log(filename);
        this.productService.addProduct(
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
    // console.log(this.form.value);
    this.form.reset();
    window.alert("Form Uploaded Successfully!");
  }
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
