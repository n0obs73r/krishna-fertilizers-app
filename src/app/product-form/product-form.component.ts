
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Product, products } from '../products';
import { ProductSubmissionService } from '../product-submission.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  constructor(public productService: ProductSubmissionService) {}

  ngOnInit(): void {
  }
  
  // private products: Product[] = [];
  
  @Output() productCreated = new EventEmitter();

  onSubmit(form: NgForm){
    if (form.invalid){
      return;
    }
    this.productService.addProduct(
      form.value.p_name,
      form.value.p_brand,
      form.value.type,
      form.value.price,
      form.value.description,
      form.value.img_url,
      form.value.sale,
      form.value.s_price,
      form.value.season
    )
    console.log(form.value.sale);
  }
  
  textBoxDisabled = true;

  toggleOff(){
    this.textBoxDisabled = false;
  }
  toggleOn(){
    this.textBoxDisabled = true;
  }
}
