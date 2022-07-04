import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

import { Table } from '../../models/table';
import { TableService } from '../../services/table.service';

import { productTYPES } from '../../mocks/constants';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {
    myOrderForm: FormGroup;

    productTypes = productTYPES;    

    submitted = false;
    showMyOrderDetail = false;
    orderSuccess = false;
    prodFilter: string = '';
    filterOn: boolean = false;
    productCounter: number = 0;

    tableSelected: Table;
    showOrderBtn = false;

    constructor(private formBuilder: FormBuilder, 
                private productService: ProductService,
                private orderService: OrderService,
                private tableService: TableService) { }

    ngOnInit() {
      /*
      this.myFilterForm = this.formBuilder.group({
            filter            : [''],
      });
      */

      
      this.myOrderForm = this.formBuilder.group({
            _id               : [''],
            orderStatus       : ['', Validators.required],
            tableNumber       : [0, Validators.required],
            userId            : ['', Validators.required],
            userNick          : ['', Validators.required],
            prodId            : ['', Validators.required],
            prodType          : ['', Validators.required],
            prodName          : ['', Validators.required],
            prodPrice         : [0, Validators.required],
            prodQty           : [1, [Validators.required, Validators.pattern('^([1-9]|[1-9][0-9])?$')]],
        });
        
        this.getProducts();
        this.getTablesOpened();
    }

    // convenience getter for easy access to form fields
    get f() { return this.myOrderForm.controls; }
    //get g() { return this.myFilterForm.controls; }

    setFilter(filter: string) {
      this.prodFilter = filter;
      if(this.prodFilter != '') {
        this.getProductsByType(this.prodFilter);
      } else {
        this.getProducts();
      }
    }    

    selectTable(tabSel: Table) {
      this.tableSelected = tabSel;
      this.showOrderBtn = true;
       
    }

    getProducts() {
      this.productService.getProducts()
        .subscribe(res => {
          this.productService.products = res as Product[];
          this.productCounter = this.productService.products.length;
          console.log(res);
        });
    }

    getTablesOpened() {
      this.tableService.getTablesByTableStatus('Open')
        .subscribe(res => {
          this.tableService.tables = res as Table[];
          //this.tablesCounter = this.tableService.tables.length;
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

    editOrder(product: Product) {
      this.orderSuccess = false;
      this.showMyOrderDetail = true;
      this.productService.selectedProduct = product;

      this.myOrderForm.get('orderStatus').setValue('Ordered');
      this.myOrderForm.get('tableNumber').setValue(this.tableSelected.tableNumber);
      this.myOrderForm.get('userId').setValue('5e4166d016e2493964aa78e3');
      this.myOrderForm.get('userNick').setValue('Nina');
      this.myOrderForm.get('prodId').setValue(product._id);
      this.myOrderForm.get('prodType').setValue(product.type);
      this.myOrderForm.get('prodName').setValue(product.name);
      // If product.status = 'Happy' => calcular prod.price antes de setearlo!!!
      if(product.type == 'Happy') {
        this.myOrderForm.get('prodPrice').setValue(product.price * product.happyIndex);  
      } else {
        this.myOrderForm.get('prodPrice').setValue(product.price);  
      }

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

        if (this.myOrderForm.invalid) {
            return;
        };

        let newOrder = new Order (
          this.myOrderForm.value._id,
          this.myOrderForm.value.orderStatus, 
          this.myOrderForm.value.tableNumber,
          this.myOrderForm.value.userId,
          this.myOrderForm.value.userNick,
          this.myOrderForm.value.prodId,
          this.myOrderForm.value.prodType,
          this.myOrderForm.value.prodName,
          this.myOrderForm.value.prodPrice,
          this.myOrderForm.value.prodQty
        );

        if(newOrder._id) {
          this.orderService.putOrder(newOrder)
            .subscribe(res => {
              this.onReset();
            });
        } else {
          this.orderService.postOrder(newOrder)
          .subscribe(res => {
            this.showMyOrderDetail = false;
            this.orderSuccess = true;
            this.onReset();
          });
        }

        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    }

    onReset(form?: FormGroup) {
      if (form) {
        this.submitted = false;
        form.reset();
        this.productService.selectedProduct = new Product();
      }
    }    

}
