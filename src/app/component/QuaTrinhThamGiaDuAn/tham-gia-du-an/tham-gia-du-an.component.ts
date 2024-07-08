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


import { QuaTrinhThamGiaDuAnService } from '../qua-trinh-tham-gia-du-an.service';
import { ThemThamGiaDuAnComponent } from '../popup/them-tham-gia-du-an/them-tham-gia-du-an.component';
import { SuaThamGiaDuAnComponent } from '../popup/sua-tham-gia-du-an/sua-tham-gia-du-an.component';
import { ChiTietThamGiaDuAnComponent } from '../popup/chi-tiet-tham-gia-du-an/chi-tiet-tham-gia-du-an.component';

@Component({
  selector: 'app-tham-gia-du-an',
  templateUrl: './tham-gia-du-an.component.html',
  styleUrls: ['./tham-gia-du-an.component.css']
})
export class ThamGiaDuAnComponent {

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["STT", "TuNgay", "DenNgay", "SanPhamCNTT", "MoTa", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor( 
    private dialog: MatDialog,
  private _QuaTrinhThamGiaDuAnService: QuaTrinhThamGiaDuAnService) {
    // this.loadcustomer();
  }

  ngOnInit(): void {
      this.getQuaTrinhThamGiaDuAn();
  }

  getQuaTrinhThamGiaDuAn(){
    this._QuaTrinhThamGiaDuAnService.getQuaTrinhThamGiaDuAn().subscribe({
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

  deleteQuaTrinhThamGiaDuAn(id: number) {
    console.log(`Deleting ID: ${id}`);
    const updatedData = { action: -1 };
    this._QuaTrinhThamGiaDuAnService.updateQuaTrinhThamGiaDuAn(id, updatedData).subscribe({
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
    const dialogRef = this.dialog.open(SuaThamGiaDuAnComponent,{
      data,
    })
  }

  addcustomer(){
    this.Openpopup(0, 'Thêm quá trình tham gia dự án',ThemThamGiaDuAnComponent);
  }

  OpenDetails(data: any){
    const dialogRef = this.dialog.open(ChiTietThamGiaDuAnComponent,{
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
