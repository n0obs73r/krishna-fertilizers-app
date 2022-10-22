import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductSubmissionService } from '../product-submission.service';
import { Product } from '../products';

@Component({
  selector: 'app-machinery-view',
  templateUrl: './machinery-view.component.html',
  styleUrls: ['./machinery-view.component.scss']
})
export class MachineryViewComponent implements OnInit {
  products: Product[] = [];
  private productsSub?: Subscription;

  constructor( public productsService: ProductSubmissionService) { }

  ngOnInit(): void {
    this.productsService.getMachinery();
    this.productsSub = this.productsService.getProductUpdateListener()
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }

  seeds = [...this.products];
  gridColumns = 3;

  // toggleGridColumns() {
  //   this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  // }
}
