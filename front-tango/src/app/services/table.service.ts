import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from '../models/table';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  selectedTable: Table;
  tables: Table[];
  status: string;
  number: number;

  readonly URL_API = 'http://localhost:3000/api/tables/';

  constructor(private http: HttpClient) { 
    this.selectedTable = new Table();
  }

  getTableByTableNumber(number: number) {
    return this.http.get(this.URL_API + 'filter/number/' + number);
  }  

  getTablesByTableStatus(status: string) {
    return this.http.get(this.URL_API + 'filter/status/' + status);
  }    

  putTable(table: Table) {
    //return this.http.put(this.URL_API + `/${table._id}`, table);
    return this.http.put(this.URL_API + '/' + table._id, table);
  }    

}

/*
router.get('/filter/number/:tableNumber', table.getTableByTableNumber);
router.get('/filter/status/:tableStatus', table.getTablesByTableStatus);
router.put('/:id', table.editTable);
*/