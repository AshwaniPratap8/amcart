import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  searchStringEmpty: boolean = false;
  previousKeyword: string = '';

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
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;
    console.log(`keyword=${keyword}`);

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId:${this.currentCategoryId}, pageNumber:${this.pageNumber}`);

    if (keyword === '') {
      console.log(`keywordddd`);
      this.searchStringEmpty = true;
      this.products = [];
    } else {
      if(this.previousKeyword !== keyword) {
        this.pageNumber = 1;
        this.pageSize = 10;
      }
      this.productService.searchProductsPaginate(this.pageNumber - 1, this.pageSize, keyword).subscribe(
        data => {
          this.searchStringEmpty = false;
          this.products = data._embedded.products;
          this.pageNumber = data.page.number + 1;
          this.pageSize = data.page.size;
          this.totalElements = data.page.totalElements;
        }
      );
    }
    this.previousKeyword = keyword;
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    this.searchStringEmpty = false;

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId:${this.currentCategoryId}, pageNumber:${this.pageNumber}`);

    this.productService.getProductListPaginate(this.pageNumber - 1, this.pageSize, this.currentCategoryId).subscribe(
      data => {
        this.products = data._embedded.products;
        this.pageNumber = data.page.number + 1;
        this.pageSize = data.page.size;
        this.totalElements = data.page.totalElements;
      }
    );
  }
}
