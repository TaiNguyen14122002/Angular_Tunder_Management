import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { PopupComponent } from '../popup/popup.component';

import { TrinhDoHocVanService } from '../services/trinh-do-hoc-van.service';
import { CapNhapComponent } from '../popup/cap-nhap/cap-nhap.component';
import { ChiTietTrinhDoHVComponent } from '../popup/chi-tiet-trinh-do-hv/chi-tiet-trinh-do-hv.component';






@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["STT", "TuNgay", "DenNgay", "TrinhDoDaoTao", "ChuyenNganhDaoTao", "NganhDaoTao", "HinhThucDaoTao", "CoSoDaoTao", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor( 
    private dialog: MatDialog,
  private _empService: TrinhDoHocVanService) {
    // this.loadcustomer();
  }

  ngOnInit(): void {
      this.getTrinhDoHoVan();
  }

  openAddEditEmpForm(){
    const dialogRef = this.dialog.open(PopupComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getTrinhDoHoVan();
        }
      }
    })
  }

  getTrinhDoHoVan(){
    this._empService.getTrinhDoHocVan().subscribe({
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

  deleteTrinhDoHocVan(id: number) {
    console.log(`Deleting ID: ${id}`);
    const updatedData = { action: -1 };
    this._empService.deleteTrinhDoHocVan(id, updatedData).subscribe({
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

  openEditForm(data:any){
    const dialogRef = this.dialog.open(CapNhapComponent,{
      data,
    })
  }

  OpenDetail(data:any){
    const dialogRef = this.dialog.open(ChiTietTrinhDoHVComponent,{
      data,
    })
  }

  
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  

  addcustomer(){
    this.Openpopup(0, 'Thêm trình độ học vấn',PopupComponent);
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
