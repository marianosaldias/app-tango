import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { productTYPES } from '../../mocks/constants';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    productForm: FormGroup;

    productTypes = productTYPES;

    submitted = false;

    show: boolean = false;
    prodFilter: string = '';
    productCounter: number = 0;    

    constructor(private formBuilder: FormBuilder, private productService: ProductService) { }

    ngOnInit() {
        this.productForm = this.formBuilder.group({
            _id               : [''],
            type              : ['', Validators.required],
            name              : ['', Validators.required],
            description       : [''],
            status            : ['', Validators.required],
            price             : ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
            happyIndex        : ['', [Validators.required, Validators.pattern('[]|[0-9]+(\.[0-9]{1,2})?$')]],
        });

        this.getProducts();
    }

    // convenience getter for easy access to form fields
    get f() { return this.productForm.controls; }

    setFilter(filter: string) {
      this.prodFilter = filter;
      if(this.prodFilter != '') {
        this.getProductsByType(this.prodFilter);
      } else {
        this.getProducts();
      }
    }    

    getProducts() {
      this.productService.getProducts()
        .subscribe(res => {
          this.productService.products = res as Product[];
          this.productCounter = this.productService.products.length;
          console.log(res);
        });
    }

    getProductsByType(type: string) {
      this.productService.getProductsByType(type)
        .subscribe(res => {
          this.productService.products = res as Product[];
          this.productCounter = this.productService.products.length;
          console.log(res);
        });
    }

    editProduct(product: Product) {
      this.show = true;
      this.productService.selectedProduct = product;

      this.productForm.get('_id').setValue(product._id);
      this.productForm.get('type').setValue(product.type);
      this.productForm.get('name').setValue(product.name);
      this.productForm.get('description').setValue(product.description);
      this.productForm.get('status').setValue(product.status);
      this.productForm.get('price').setValue(product.price);
      this.productForm.get('happyIndex').setValue(product.happyIndex);

      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.productForm.value, null, 4));
    }

    deleteProduct(_id: string) {
      this.productService.deleteProduct(_id)
        .subscribe(res => {
          this.getProducts();
          this.onReset();
        })
    }    

    onSubmit() {
        this.submitted = true;

        if (this.productForm.invalid) {
            return;
        };

        let newProduct = new Product (
          this.productForm.value._id,
          this.productForm.value.type, 
          this.productForm.value.name,
          this.productForm.value.description,
          this.productForm.value.status,
          this.productForm.value.price,
          this.productForm.value.happyIndex
        );

        if(newProduct._id) {
          this.productService.putProduct(newProduct)
            .subscribe(res => {
              this.onReset();
              if(this.prodFilter != '') {
                this.getProductsByType(this.prodFilter);
              } else {
                this.getProducts();
              }                 
            });
        } else {
          this.productService.postProduct(newProduct)
          .subscribe(res => {
            this.onReset();
            if(this.prodFilter != '') {
              this.getProductsByType(this.prodFilter);
            } else {
              this.getProducts();
            }               
          });
        }     

        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    }

    toggle() {
      this.show = !this.show;
    }    

    onReset(form?: FormGroup) {
      if (form) {
        this.submitted = false;
        form.reset();
        this.productService.selectedProduct = new Product();
      }
    }    

}

