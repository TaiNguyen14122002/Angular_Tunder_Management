import { Component, Inject, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';



import { HttpClient } from '@angular/common/http';
import { QuaTrinhThamGiaDuAnService } from '../../qua-trinh-tham-gia-du-an.service';
@Component({
  selector: 'app-them-tham-gia-du-an',
  templateUrl: './them-tham-gia-du-an.component.html',
  styleUrls: ['./them-tham-gia-du-an.component.css']
})
export class ThemThamGiaDuAnComponent implements OnInit {

  inputdata: any = { title: '' };
  editdata: any;
  empForm: FormGroup;
  closemessage = 'closed using directive'
  selectedFileBase64: string | null = null;
  minEndDate: Date | null = null;


  constructor(
    private ref: MatDialogRef<ThemThamGiaDuAnComponent>, private buildr: FormBuilder,
    
    private _fb: FormBuilder,
    private _empService: QuaTrinhThamGiaDuAnService,
    private _dialoogRef: MatDialogRef<ThemThamGiaDuAnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      TuNgay: ['', Validators.required],
      DenNgay: ['', Validators.required],
      SanPhamCNTT: ['', Validators.required],
      MoTa: ['', Validators.required],
      action: 1
    })

  }

  onFromSubmit() {
    if (this.empForm.valid) {
      // const formData = this.empForm.value;
      // if(this.selectedFileBase64){
      //   formData.fileBase64 = this.selectedFileBase64;
      // }
      this._empService.addQuaTrinhThamGiaDuAn(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('QuaTrinhCongTac added successflly');
          this._dialoogRef.close();
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }
  }

  // onFromSubmit() {
  //   if (this.empForm.valid) {
      
  //       // Add logic
  //       this._empService.addTrinhDoHocVan(this.empForm.value).subscribe({
  //         next: (val: any) => {
  //           alert('Thêm mới thành công');
  //           this.ref.close();
  //         },
  //         error: (err: any) => {
  //           console.error(err);
  //         }
  //       });
  //     }
  //   }
  // }

  ngOnInit(): void {
    if (this.data) {
      this.empForm.patchValue(this.data);
      this.inputdata = { title: 'Cập nhập Trình Độ Học Vấn' }; // Cập nhập title khi có data
    } else {
      this.inputdata = { title: 'Thêm Trình Độ Học Vấn' }; // Thêm title khi không có data
    }

    this.empForm.get('TuNgay')?.valueChanges.subscribe(() => {
      this.minEndDate = this.empForm.get('TuNgay')?.value;
      this.empForm.get('DenNgay')?.updateValueAndValidity();
      this.empForm.get('NgayCapChungChi')?.updateValueAndValidity();
    });

  }

  //Chon DenNgay phai Lon hon TuNgay
  dateRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const fromDate = this.empForm.get('TuNgay')?.value;
    const toDate = control.value;
    if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
      return { dateRange: true };
    }
    return null;
  }

  onStartDateChange(event: any) {
    this.minEndDate = event.value;
    this.empForm.get('DenNgay')?.updateValueAndValidity();
  }

  endDateFilter = (d: Date | null): boolean => {
    if (!d || !this.minEndDate) {
      return true;
    }
    return d >= this.minEndDate;
  }

  

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.empForm.patchValue({
        pdfFile: file // Lưu file PDF vào trường pdfFile của empForm
      });
    }
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  myform = this.buildr.group({
    name: this.buildr.control(''),
    email: this.buildr.control(''),
    phone: this.buildr.control(''),
    status: this.buildr.control(true)
  });
}
