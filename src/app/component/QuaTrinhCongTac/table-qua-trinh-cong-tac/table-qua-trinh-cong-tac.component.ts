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


import { QuaTrinhCongTacService } from '../qua-trinh-cong-tac.service';
import { ThemQuaTrinhCongTacComponent } from '../popup/them-qua-trinh-cong-tac/them-qua-trinh-cong-tac.component';
import { SuaQuaTrinhCongTacComponent } from '../popup/sua-qua-trinh-cong-tac/sua-qua-trinh-cong-tac.component';
import { ChiTietQuaTrinhCongTacComponent } from '../popup/chi-tiet-qua-trinh-cong-tac/chi-tiet-qua-trinh-cong-tac.component';

@Component({
  selector: 'app-table-qua-trinh-cong-tac',
  templateUrl: './table-qua-trinh-cong-tac.component.html',
  styleUrls: ['./table-qua-trinh-cong-tac.component.css']
})
export class TableQuaTrinhCongTacComponent implements OnInit{

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["STT", "TuNgay", "DenNgay", "ChucDanhCongViec", "DonViCongTac", "LyDoNghiViec", "MucThuNhap", "TrongNganh", "MoTa", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor( 
    private dialog: MatDialog,
  private _QuaTrinhCongTacService: QuaTrinhCongTacService) {
    // this.loadcustomer();
  }

  ngOnInit(): void {
      this.getQuaTrinhCongTac();
  }

  getQuaTrinhCongTac(){
    this._QuaTrinhCongTacService.getQuaTrinhCongTac().subscribe({
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

  deleteQuaTrinhCongTac(id: number) {
    console.log(`Deleting ID: ${id}`);
    const updatedData = { action: -1 };
    this._QuaTrinhCongTacService.updateQuaTrinhCongTac(id, updatedData).subscribe({
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
    const dialogRef = this.dialog.open(SuaQuaTrinhCongTacComponent,{
      data,
    })
  }

  addcustomer(){
    this.Openpopup(0, 'Thêm quá trình công tác',ThemQuaTrinhCongTacComponent);
  }

  OpenDetails(data: any){
    const dialogRef = this.dialog.open(ChiTietQuaTrinhCongTacComponent,{
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
