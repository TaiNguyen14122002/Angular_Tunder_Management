import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chi-tiet-chung-nhan',
  templateUrl: './chi-tiet-chung-nhan.component.html',
  styleUrls: ['./chi-tiet-chung-nhan.component.css']
})
export class ChiTietChungNhanComponent {


  data: any;
  constructor(
    private _dialog: MatDialogRef<ChiTietChungNhanComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any
  ) {
    this.data = inputData;
  }

  closeModal() {
    this._dialog.close();
  }

}
