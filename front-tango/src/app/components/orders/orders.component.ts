import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Table } from '../../models/table';
import { TableService } from '../../services/table.service';

import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {
    @Input() tableSel: Table;

    orderForm: FormGroup;
    submitted = false;
    showOrderDetail = false;
    orderSuccess = false;

    orderCounter: number = 0;

    constructor(private formBuilder: FormBuilder, private orderService: OrderService, private tableService: TableService) { }

    ngOnInit() {
        this.orderForm = this.formBuilder.group({
            _id               : [''],
            orderStatus       : ['', Validators.required],
            tableNumber       : [0, Validators.required],
            userId            : ['', Validators.required],
            userNick          : ['', Validators.required],
            prodId            : ['', Validators.required],
            prodType          : ['', Validators.required],
            prodName          : ['', Validators.required],
            prodPrice         : [0, Validators.required],
            prodQty           : [0, Validators.required],
        });

        this.getOrders();
    }

    ngOnChanges() {
      this.getOrdersInit();
    }

    getOrders() {
      this.orderService.getOrders()
      .subscribe(res => {
        this.orderService.orders = res as Order[];
        this.orderCounter = this.orderService.orders.length;
        console.log(res);
      });        
    }  

    getOrdersInit() {
      if(this.tableSel != undefined || this.tableSel != null) {
        this.getOrdersByTable(this.tableSel.tableNumber);
      } else {
        this.getOrders();        
      }  
    }

    getOrdersByTable(tableN: number) {
      this.orderService.getOrdersByTableNumber(tableN)
        .subscribe(res => {
          this.orderService.orders = res as Order[];
          this.orderCounter = this.orderService.orders.length;
          console.log(res);
        });
    }  

    editOrder(order: Order) {
      this.orderService.selectedOrder = order;
      this.orderSuccess = false;
      this.showOrderDetail = true;

      this.orderForm.get('_id').setValue(order._id);
      this.orderForm.get('orderStatus').setValue(order.orderStatus);
      this.orderForm.get('tableNumber').setValue(order.tableNumber);
      this.orderForm.get('userId').setValue(order.userId);
      this.orderForm.get('userNick').setValue(order.userNick);
      this.orderForm.get('prodId').setValue(order.prodId);
      this.orderForm.get('prodType').setValue(order.prodType);
      this.orderForm.get('prodName').setValue(order.prodName);
      this.orderForm.get('prodPrice').setValue(order.prodPrice);
      this.orderForm.get('prodQty').setValue(order.prodQty);

      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.orderForm.value, null, 4));
    }

    deleteOrder(_id: string) {
      this.orderService.deleteOrder(_id)
        .subscribe(res => {
          this.getOrders();
          this.onReset();
          this.showOrderDetail = false;
        })
    }


    onSubmit() {
        this.submitted = true;

        if (this.orderForm.invalid) {
            return;
        };

        let newOrder = new Order (
          this.orderForm.value._id,
          this.orderForm.value.orderStatus, 
          this.orderForm.value.tableNumber,
          this.orderForm.value.userId,
          this.orderForm.value.userNick,
          this.orderForm.value.prodId,
          this.orderForm.value.prodType,
          this.orderForm.value.prodName,
          this.orderForm.value.prodPrice,
          this.orderForm.value.prodQty
        );

        if(newOrder._id) {
          this.orderService.putOrder(newOrder)
            .subscribe(res => {
              this.onReset();
              this.getOrders();
              this.orderSuccess = true;
              this.showOrderDetail = false;
            });
        } else {
          this.orderService.postOrder(newOrder)
          .subscribe(res => {
            this.onReset();
            this.getOrders();
          });
        }

        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.orderForm.value, null, 4));
    }

    changeTableStatus() {
      if(this.tableSel.tableStatus == "Free") {
        this.tableSel.tableStatus = "Open";
      } else {
        this.tableSel.tableStatus = "Free";
      }
      let tableUpdated = new Table (
        this.tableSel._id,
        this.tableSel.tableNumber,
        this.tableSel.tableStatus,
        this.tableSel.userId,
        this.tableSel.userNick,
        this.tableSel.dateTimeOpen,
        this.tableSel.dateTimeClose,
        this.tableSel.total
      );      
      this.tableService.putTable(tableUpdated)
      .subscribe(res => {
        this.getOrders();
      });
    }

    onReset(form?: FormGroup) {
      if (form) {
        this.submitted = false;
        form.reset();
        this.orderService.selectedOrder = new Order();
      }
    }  


}

/*
  Solo el profile "Super" o el mismo "Commander" que ha creado la orden pueden cambiar status o eliminar un documento.
  Comparando el Nick del User logueado y el Nick del documento "order" podria darme cuenta si puedo dar acceso al cambio de orderStatus
*/
