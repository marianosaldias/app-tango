import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Table } from '../../models/table';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
    tableForm: FormGroup;
    myFilterForm: FormGroup;

    tableSelected: Table;

    submitted = false;

    tableStatus: string;

    show: boolean = false;
    tableFilter: string;
    tablesCounter: number = 0;    
    sel: boolean = false;

    constructor(private formBuilder: FormBuilder, private tableService: TableService) { }

    ngOnInit() {
        this.myFilterForm = this.formBuilder.group({
            filter            : ['Open'],
        });

        this.tableStatus = 'Open';
        this.tableFilter = 'Open';

        this.tableForm = this.formBuilder.group({
            _id               : [''],
            tableNumber       : [0, Validators.required],
            tableStatus       : ['', Validators.required],
            userId            : [''],
            userNick          : ['', Validators.required],
            dateTimeOpen      : ['', Validators.required],
            dateTimeClose     : ['', Validators.required],
            total             : [0],
        });

        this.getTables(this.tableStatus);
    }

    // convenience getter for easy access to form fields
    //get f() { return this.tableForm.controls; }

    setFilter(newStatus: string) {
      this.tableFilter = newStatus;
      this.getTables(this.tableFilter);
    }       

    getTables(tableStatus: string) {
      this.tableService.getTablesByTableStatus(tableStatus)
        .subscribe(res => {
          this.tableService.tables = res as Table[];
          this.tablesCounter = this.tableService.tables.length;
          console.log(res);
        });
    }

    editProduct(table: Table) {
      this.show = true;
      this.tableService.selectedTable = table;

      this.tableForm.get('_id').setValue(table._id);
      this.tableForm.get('tableNumber').setValue(table.tableNumber);
      this.tableForm.get('tableStatus').setValue(table.tableStatus);
      this.tableForm.get('userId').setValue(table.userId);
      this.tableForm.get('userNick').setValue(table.userNick);
      this.tableForm.get('dateTimeOpen').setValue(table.dateTimeOpen);
      this.tableForm.get('dateTimeClose').setValue(table.dateTimeClose);
      this.tableForm.get('total').setValue(table.total);

      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.productForm.value, null, 4));
    }

    onSubmit() {
        this.submitted = true;

        if (this.tableForm.invalid) {
            return;
        };

        let newTable = new Table (
          this.tableForm.value._id,
          this.tableForm.value.tableNumber, 
          this.tableForm.value.tableStatus,
          this.tableForm.value.userId,
          this.tableForm.value.userNick,
          this.tableForm.value.dateTimeOpen,
          this.tableForm.value.dateTimeClose,
          this.tableForm.value.total
        );

        if(newTable._id) {
          this.tableService.putTable(newTable)
            .subscribe(res => {
              this.onReset();
              this.getTables(this.tableFilter);
            });
        }     

        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    }

    toggle() {
      this.show = !this.show;
    }    

    selectTable(selectedTable: Table) {
      this.tableSelected = selectedTable;
      this.sel = true;
    }

    onReset(form?: FormGroup) {
      if (form) {
        this.submitted = false;
        form.reset();
        this.tableService.selectedTable = new Table();
      }
    }    

}

