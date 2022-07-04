import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  selectedOrder: Order
  orders: Order[];

  readonly URL_API = 'http://localhost:3000/api/orders/';

  constructor(private http: HttpClient) { 
    this.selectedOrder = new Order();
  }

  getOrders() {
    return this.http.get(this.URL_API);
  }

  getOrdersByTableNumber(tableNumber: number) {
    return this.http.get(this.URL_API + 'filter/table/' + tableNumber);
  }  

  postOrder(Order: Order) {
    return this.http.post(this.URL_API, Order);
  }  

  putOrder(order: Order) {
    //return this.http.put(this.URL_API + `/${order._id}`, order);
    return this.http.put(this.URL_API + '/' + order._id, order);
  }    

  deleteOrder(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }      

}

