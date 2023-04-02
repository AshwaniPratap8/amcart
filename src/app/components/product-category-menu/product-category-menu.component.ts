import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductCategorySubcategories } from 'src/app/common/product-category-subcategories';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategories: ProductCategory[] = [];
  productCategorySubcategories: ProductCategorySubcategories[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        this.productCategories = data;
        var all: string = "";
        for (let productCategory of data) {
          var name = productCategory.categoryName;
          var mainCategory = name.substring(0, name.indexOf("-"));
          var subCategory = name.substring(name.indexOf("-") + 1, name.lastIndexOf("-"));

          if (!all.includes(mainCategory + "-" + subCategory)) {
            all = all.concat(mainCategory, "-", subCategory);
            var subSubCategories: string[] = [];
    
            for (let productCategory1 of data) {
              if (productCategory1.categoryName.startsWith(mainCategory + "-" + subCategory)) {
                subSubCategories.push(productCategory1.categoryName.substring(name.lastIndexOf("-") + 1));
              }
            }
    
            const pb = new ProductCategorySubcategories(mainCategory, subCategory, subSubCategories);
            this.productCategorySubcategories.push(pb);
          }
        }
      }
    );
  }
}
