import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductSubmissionService } from '../product-submission.service';
import {Product} from '../products';
import {PageEvent} from "@angular/material/paginator";
@Component({
  selector: 'app-seeds-view',
  templateUrl: './seeds-view.component.html',
  styleUrls: ['./seeds-view.component.scss']
})
export class SeedsViewComponent implements OnInit {
  products: Product[] = [];
  private productsSub?: Subscription;
  totalProducts = 0;
  productsPerPage = 3;
  isLoading = false;
  currentPage = 1;
  pageSizeOptions = [2, 4, 8];

  constructor( public productsService: ProductSubmissionService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.productsService.getSeeds(this.productsPerPage,this.currentPage);
    this.productsSub = this.productsService.getProductUpdateListener()
      .subscribe((productData: { products: Product[], productCount: number }) => {
        this.isLoading = false;
        this.products = productData.products;
        this.totalProducts = productData.productCount;
      });
  }

  seeds = [...this.products];

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex +1;
    this.productsPerPage = pageData.pageSize;
    this.productsService.getSeeds(this.productsPerPage,this.currentPage);
  }


}
