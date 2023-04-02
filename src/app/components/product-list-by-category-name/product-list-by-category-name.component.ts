import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list-by-category-name',
  templateUrl: './product-list-by-category-name.component.html',
  styleUrls: ['./product-list-by-category-name.component.css']
})
export class ProductListByCategoryNameComponent implements OnInit {
  products: Product[] = [];
  currentCategory: string = "";
  previousCategory: string = "";
  searchStringEmpty: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    const hasCategory: boolean = this.route.snapshot.paramMap.has('categoryName');

    if (hasCategory) {
      this.currentCategory = this.route.snapshot.paramMap.get('categoryName')!;
    } else {
      this.currentCategory = "";
    }

    if (this.previousCategory !== this.currentCategory) {
      this.pageNumber = 1;
    }

    this.previousCategory = this.currentCategory;

    console.log(`currentCategory:${this.currentCategory}, pageNumber:${this.pageNumber}`);

    this.productService.getProductListByCategoryPaginate(this.pageNumber - 1, this.pageSize, this.currentCategory).subscribe(
      data => {
        this.products = data._embedded.products;
        this.pageNumber = data.page.number + 1;
        this.pageSize = data.page.size;
        this.totalElements = data.page.totalElements;
      }
    );
  }
}
