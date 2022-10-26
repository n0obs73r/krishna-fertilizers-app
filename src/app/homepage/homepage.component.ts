import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
// import { seeds } from '../Products/seeds'
import { ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { EffectCube, Pagination } from "swiper";
import {ProductSubmissionService} from "../product-submission.service";
import {Product} from "../products";
import {Subscription} from "rxjs";

// install Swiper modules
SwiperCore.use([EffectCube, Pagination]);

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {


  // seeds = [...seeds];

  private productsSub?: Subscription;
  products: Product[] = [];
  isLoading = false;
  constructor( public productsService: ProductSubmissionService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.productsService.getSale();
    this.productsSub = this.productsService.getProductUpdateListener()
      .subscribe((productData: { products: Product[]}) => {
        this.isLoading = false;
        this.products = productData.products;
        console.log("Homepage: "+ productData.products);
      });
    // console.log("Homepage: "+ this.products);


  }
  seeds = [...this.products];


  swiperConfig: any = {
    slidesPerView: 'auto',
    freeMode: 'true',
    spaceBetween: 20,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1.7,
        spaceBetween: 50
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 50
      },
      // when window width is >= 640px
      1400: {
        slidesPerView: 4,
        spaceBetween: 150
      }
    }
  }



}
