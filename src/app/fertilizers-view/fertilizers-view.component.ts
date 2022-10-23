import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductSubmissionService } from '../product-submission.service';
import { Product } from '../products';
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-fertilizers-view',
  templateUrl: './fertilizers-view.component.html',
  styleUrls: ['./fertilizers-view.component.scss']
})
export class FertilizersViewComponent implements OnInit {
  products: Product[] = [];
  private productsSub?: Subscription;
  totalProducts = 0;
  productsPerPage = 4;
  pageSizeOptions = [2, 4, 8];
  currentPage = 1;
  isLoading = false;


  constructor(public productsService: ProductSubmissionService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.productsService.getFertilizers(this.productsPerPage,1);
    this.productsSub = this.productsService.getProductUpdateListener()
      .subscribe((productData: { products: Product[], productCount: number }) => {
        this.isLoading = false;
        this.products = productData.products;
        this.totalProducts = productData.productCount;
      });
  }
  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex +1;
    this.productsPerPage = pageData.pageSize;
    this.productsService.getFertilizers(this.productsPerPage,this.currentPage);
  }

  fertilizers = [...this.products];
  gridColumns = 3;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

}
