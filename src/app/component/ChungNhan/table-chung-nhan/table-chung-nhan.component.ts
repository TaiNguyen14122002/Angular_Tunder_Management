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
import { ChungNhanService } from '../Services/chung-nhan.service';
import { ThemChungNhanComponent } from '../popup/them-chung-nhan/them-chung-nhan.component';
import { SuaChungNhanComponent } from '../popup/sua-chung-nhan/sua-chung-nhan.component';
import { ChiTietChungNhanComponent } from '../popup/chi-tiet-chung-nhan/chi-tiet-chung-nhan.component';

@Component({
  selector: 'app-table-chung-nhan',
  templateUrl: './table-chung-nhan.component.html',
  styleUrls: ['./table-chung-nhan.component.css']
})
export class TableChungNhanComponent implements OnInit {

  //   {
  //     id: 1,
  //     TuNgay: '2023-01-01',
  //     DenNgay: '2023-12-31',
  //     TrinhDoDaoTao: 'Đại học',
  //     ChuyenNganhDaoTao: 'Công nghệ thông tin',
  //     NganhDaoTao: 'Công nghệ thông tin',
  //     HinhThucDaoTao: 'Chính quy',
  //     CoSoDaoTao: 'Đại học Thủ Dầu Một'
  //   },
  //   {
  //     id: 2,
  //     TuNgay: '2023-01-01',
  //     DenNgay: '2023-12-31',
  //     TrinhDoDaoTao: 'Đại học',
  //     ChuyenNganhDaoTao: 'Công nghệ thông tin',
  //     NganhDaoTao: 'Công nghệ thông tin',
  //     HinhThucDaoTao: 'Chính quy',
  //     CoSoDaoTao: 'Đại học Thủ Dầu Một'
  //   },
  //   {
  //     id: 3,
  //     TuNgay: '2023-01-01',
  //     DenNgay: '2023-12-31',
  //     TrinhDoDaoTao: 'Đại học',
  //     ChuyenNganhDaoTao: 'Công nghệ thông tin',
  //     NganhDaoTao: 'Công nghệ thông tin',
  //     HinhThucDaoTao: 'Chính quy',
  //     CoSoDaoTao: 'Đại học Thủ Dầu Một'
  //   },
  //   {
  //     id: 4,
  //     TuNgay: '2023-01-01',
  //     DenNgay: '2023-12-31',
  //     TrinhDoDaoTao: 'Đại học',
  //     ChuyenNganhDaoTao: 'Công nghệ thông tin',
  //     NganhDaoTao: 'Công nghệ thông tin',
  //     HinhThucDaoTao: 'Chính quy',
  //     CoSoDaoTao: 'Đại học Thủ Dầu Một'
  //   },
  //   {
  //     id: 5,
  //     TuNgay: '2023-01-01',
  //     DenNgay: '2023-12-31',
  //     TrinhDoDaoTao: 'Đại học',
  //     ChuyenNganhDaoTao: 'Công nghệ thông tin',
  //     NganhDaoTao: 'Công nghệ thông tin',
  //     HinhThucDaoTao: 'Chính quy',
  //     CoSoDaoTao: 'Đại học Thủ Dầu Một'
  //   },
  //   {
  //     id: 6,
  //     TuNgay: '2023-01-01',
  //     DenNgay: '2023-12-31',
  //     TrinhDoDaoTao: 'Đại học',
  //     ChuyenNganhDaoTao: 'Công nghệ thông tin',
  //     NganhDaoTao: 'Công nghệ thông tin',
  //     HinhThucDaoTao: 'Chính quy',
  //     CoSoDaoTao: 'Đại học Thủ Dầu Một'
  //   },
  //   {
  //     id: 7,
  //     TuNgay: '2023-01-01',
  //     DenNgay: '2023-12-31',
  //     TrinhDoDaoTao: 'Đại học',
  //     ChuyenNganhDaoTao: 'Công nghệ thông tin',
  //     NganhDaoTao: 'Công nghệ thông tin',
  //     HinhThucDaoTao: 'Chính quy',
  //     CoSoDaoTao: 'Đại học Thủ Dầu Một'
  //   },
  //   {
  //     id: 8,
  //     TuNgay: '2023-01-01',
  //     DenNgay: '2023-12-31',
  //     TrinhDoDaoTao: 'Đại học',
  //     ChuyenNganhDaoTao: 'Công nghệ thông tin',
  //     NganhDaoTao: 'Công nghệ thông tin',
  //     HinhThucDaoTao: 'Chính quy',
  //     CoSoDaoTao: 'Đại học Thủ Dầu Một'
  //   },
    
  // ];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["STT", "TuNgay", "DenNgay", "NgayCapChungChi", "ChungNhanChungChi", "MucChungChi", "ChungChiQuocTe", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor( 
    private dialog: MatDialog,
  private _ChungNhanChungChiService: ChungNhanService) {
    // this.loadcustomer();
  }

  ngOnInit(): void {
      this.getChungNhanChungChi();
  }

  getChungNhanChungChi(){
    this._ChungNhanChungChiService.getChungNhanChungChi().subscribe({
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

  deleteChungNhanChungChi(id: number) {
    console.log(`Deleting ID: ${id}`);
    const updatedData = { action: -1 };
    this._ChungNhanChungChiService.updateChungNhanChungChi(id, updatedData).subscribe({
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
    const dialogRef = this.dialog.open(SuaChungNhanComponent,{
      data,
    })
  }

  addcustomer(){
    this.Openpopup(0, 'Thêm chứng nhận, chứng chỉ',ThemChungNhanComponent);
  }

  OpenDetails(data: any){
    const dialogRef = this.dialog.open(ChiTietChungNhanComponent,{
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
