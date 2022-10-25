import { Component, OnInit } from '@angular/core';
import {ProductSubmissionService} from "../product-submission.service";
import {Product} from "../products";
import {Subscription} from "rxjs";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  totalProducts = 0;
  productsPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [5, 10, 15, 20];
  private productsSub: Subscription | undefined;

  constructor(public productsService: ProductSubmissionService) { }


  ngOnInit() {
    this.isLoading = true;
    this.productsService.getProducts(this.productsPerPage, this.currentPage);
    this.productsSub = this.productsService
      .getProductUpdateListener()
      .subscribe((productData: {products: Product[], productCount: number}) => {
        this.totalProducts = productData.productCount;
        this.isLoading = false;
        this.products = productData.products;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.productsPerPage = pageData.pageSize;
    this.productsService.getProducts(this.productsPerPage, this.currentPage);
  }

  onDelete(productId: string) {
    this.isLoading = true;
    this.productsService.deleteProduct(productId).subscribe(() => {
      this.productsService.getProducts(this.productsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    if(this.productsSub) {
      this.productsSub.unsubscribe();
    }
  }
}
