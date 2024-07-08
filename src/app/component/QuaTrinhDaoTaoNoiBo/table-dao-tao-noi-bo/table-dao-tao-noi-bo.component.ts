import { Component,  OnInit, ViewChild  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';

import { PopupComponent } from '../../popup/popup.component';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatSelectModule} from '@angular/material/select';


import { DaoTaoNoiBoService } from '../dao-tao-noi-bo.service';
import { ThemDaoTaoNoiBoComponent } from '../them-dao-tao-noi-bo/them-dao-tao-noi-bo.component';
import { SuaDaoTaoNoiBoComponent } from '../sua-dao-tao-noi-bo/sua-dao-tao-noi-bo.component';
import { ChiTietDaoTaoNoiBoComponent } from '../chi-tiet-dao-tao-noi-bo/chi-tiet-dao-tao-noi-bo.component';

@Component({
  selector: 'app-table-dao-tao-noi-bo',
  templateUrl: './table-dao-tao-noi-bo.component.html',
  styleUrls: ['./table-dao-tao-noi-bo.component.css']
})
export class TableDaoTaoNoiBoComponent {


  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["STT", "TuNgay", "DenNgay", "TenKhoaDaoTao", "HinhThucToChuc", "DonViDaoTaoNoiBo", "DonViDaoTaoBenNgoai", "DuAnDaoTao", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor( 
    private dialog: MatDialog,
  private _QuaTrinhDaoTaoNoiBoService: DaoTaoNoiBoService) {
    // this.loadcustomer();
  }

  ngOnInit(): void {
      this.getQuaTrinhDaoTaoNoiBo();
  }

  getQuaTrinhDaoTaoNoiBo(){
    this._QuaTrinhDaoTaoNoiBoService.getQuaTrinhDaoTaoNoiBo().subscribe({
      next: (res) => {
        const filteredData = res.filter((item: any) => item.action === 1);
        this.dataSource = new MatTableDataSource(filteredData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginatior;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteQuaTrinhDaoTaoNoiBo(id: number) {
    console.log(`Deleting ID: ${id}`);
    const updatedData = { action: -1 };
    this._QuaTrinhDaoTaoNoiBoService.updateQuaTrinhDaoTaoNoiBo(id, updatedData).subscribe({
      next: () => {
        console.log(`Updated action to -1 for ID: ${id}`);
        this.dataSource.data = this.dataSource.data.map(item => {
          if (item.id === id) {
            return { ...item, action: -1 };
          }
          return item;
        });
      },
      error: (err) => {
        console.error(`Error updating action for ID: ${id}`, err);
        alert(`Error updating action for ID: ${id}. Status: ${err.status}, Message: ${err.message}`);
      }
    });
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  openEditForm(data:any){
    const dialogRef = this.dialog.open(SuaDaoTaoNoiBoComponent,{
      data,
    })
  }

  addcustomer(){
    this.Openpopup(0, 'Thêm quá trình đào tạo nội bộ',ThemDaoTaoNoiBoComponent);
  }

  OpenDetails(data: any){
    const dialogRef = this.dialog.open(ChiTietDaoTaoNoiBoComponent,{
      data,
    })
  }

  Openpopup(STT: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      data: {
        title: title,
        STT: STT
      }
    });
  }
}
