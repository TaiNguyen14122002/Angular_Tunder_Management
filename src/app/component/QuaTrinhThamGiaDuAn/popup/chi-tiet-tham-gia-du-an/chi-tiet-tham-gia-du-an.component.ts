import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chi-tiet-tham-gia-du-an',
  templateUrl: './chi-tiet-tham-gia-du-an.component.html',
  styleUrls: ['./chi-tiet-tham-gia-du-an.component.css']
})
export class ChiTietThamGiaDuAnComponent {


  data: any;
  constructor(
    private _dialog: MatDialogRef<ChiTietThamGiaDuAnComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any
  ) {
    this.data = inputData;
  }

  closeModal() {
    this._dialog.close();
  }
}
