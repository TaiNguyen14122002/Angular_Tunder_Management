import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chi-tiet-trinh-do-hv',
  templateUrl: './chi-tiet-trinh-do-hv.component.html',
  styleUrls: ['./chi-tiet-trinh-do-hv.component.css']
})
export class ChiTietTrinhDoHVComponent {

  data: any;
  constructor(
    private _dialog: MatDialogRef<ChiTietTrinhDoHVComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any
  ) {
    this.data = inputData;
  }

  closeModal() {
    this._dialog.close();
  }

}
