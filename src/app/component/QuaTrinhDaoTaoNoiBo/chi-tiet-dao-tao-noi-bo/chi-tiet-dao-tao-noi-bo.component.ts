import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-chi-tiet-dao-tao-noi-bo',
  templateUrl: './chi-tiet-dao-tao-noi-bo.component.html',
  styleUrls: ['./chi-tiet-dao-tao-noi-bo.component.css']
})
export class ChiTietDaoTaoNoiBoComponent {

  data: any;
  constructor(
    private _dialog: MatDialogRef<ChiTietDaoTaoNoiBoComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any
  ) {
    this.data = inputData;
  }

  closeModal() {
    this._dialog.close();
  }
}
