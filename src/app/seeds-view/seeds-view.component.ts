import { Component, OnInit } from '@angular/core';
// import { seeds } from '../Products/seeds'
import { Subscription } from 'rxjs';
import { ProductSubmissionService } from '../product-submission.service';
import { Product } from '../products';
@Component({
  selector: 'app-seeds-view',
  templateUrl: './seeds-view.component.html',
  styleUrls: ['./seeds-view.component.scss']
})
export class SeedsViewComponent implements OnInit {
  products: Product[] = [];
  private productsSub?: Subscription;

  constructor( public productsService: ProductSubmissionService) { }

  ngOnInit(): void {
    this.productsService.getProduct();
    this.productsSub = this.productsService.getProductUpdateListener()
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }

  seeds = [...this.products];
  gridColumns = 3;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

}
