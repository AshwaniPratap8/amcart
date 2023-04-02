import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/common/order';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
