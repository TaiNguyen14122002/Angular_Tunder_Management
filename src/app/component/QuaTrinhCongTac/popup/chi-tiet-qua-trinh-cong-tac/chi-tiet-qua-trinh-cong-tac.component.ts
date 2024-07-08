import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chi-tiet-qua-trinh-cong-tac',
  templateUrl: './chi-tiet-qua-trinh-cong-tac.component.html',
  styleUrls: ['./chi-tiet-qua-trinh-cong-tac.component.css']
})
export class ChiTietQuaTrinhCongTacComponent implements OnInit {
 


  data: any;
  constructor(
    private _dialog: MatDialogRef<ChiTietQuaTrinhCongTacComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any
  ) {
    this.data = inputData;
    this.thoiGianCamKet = 0;
    this.thoiGianConLaiNgay = 0;

  }

  ngOnInit(): void {
    this.tinhThoiGianCamKet();
    this.tinhThoiGianConLaiNgay();
  }
  thoiGianCamKet: number;
  thoiGianConLaiNgay: number;

  tinhThoiGianCamKet(): void {
    if (this.data.TuNgay && this.data.DenNgay) {
      const tuNgay = new Date(this.data.TuNgay);
      const denNgay = new Date(this.data.DenNgay);

      const timeDiff = Math.abs(denNgay.getTime() - tuNgay.getTime());
      this.thoiGianCamKet = Math.ceil(timeDiff / (1000 * 3600 * 24 * 30)); // 30 là số ngày trung bình trong một tháng
    } else {
      this.thoiGianCamKet = 0;
    }
  }

  tinhThoiGianConLaiNgay(): void {
    if (this.data.DenNgay) {
      const denNgay = new Date(this.data.DenNgay);
      const ngayHienTai = new Date();

      if (denNgay > ngayHienTai) {
        const timeDiff = Math.abs(denNgay.getTime() - ngayHienTai.getTime());
        this.thoiGianConLaiNgay = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Chia cho (1000 * 3600 * 24) để tính ra số ngày
      } else {
        this.thoiGianConLaiNgay = 0;
      }
    } else {
      this.thoiGianConLaiNgay = 0;
    }
  }


  closeModal() {
    this._dialog.close();
  }

}
