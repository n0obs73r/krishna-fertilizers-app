import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductSubmissionService } from '../product-submission.service';
import { Product } from '../products';

@Component({
  selector: 'app-fertilizers-view',
  templateUrl: './fertilizers-view.component.html',
  styleUrls: ['./fertilizers-view.component.scss']
})
export class FertilizersViewComponent implements OnInit {
  products: Product[] = [];
  private productsSub?: Subscription;

  constructor(public productsService: ProductSubmissionService) { }

  ngOnInit(): void {
    this.productsService.getFertilizers();
    this.productsSub = this.productsService.getProductUpdateListener()
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }

  fertilizers = [...this.products];
  gridColumns = 3;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

}
