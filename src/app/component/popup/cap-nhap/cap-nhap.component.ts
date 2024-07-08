import { Component, Inject, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { Subject } from 'rxjs'; // Import Subject from RxJS



import { HttpClient } from '@angular/common/http';
import { TrinhDoHocVanService } from '../../services/trinh-do-hoc-van.service';

@Component({
  selector: 'app-cap-nhap',
  templateUrl: './cap-nhap.component.html',
  styleUrls: ['./cap-nhap.component.css']
})
export class CapNhapComponent {
  inputdata: any = { title: '' };
  editdata: any;
  empForm: FormGroup;
  closemessage = 'closed using directive'
  selectedFileName: string | null = null;
  


  constructor(
    private ref: MatDialogRef<CapNhapComponent>, private buildr: FormBuilder,
    
    private _fb: FormBuilder,
    private _empService: TrinhDoHocVanService,
    private _dialoogRef: MatDialogRef<CapNhapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      TuNgay: ['', Validators.required],
      DenNgay: ['', Validators.required],
      TrinhDoDaoTao: ['', Validators.required],
      ChuyenNganhDaoTao: ['', Validators.required],
      NganhDaoTao: ['', Validators.required],
      HinhThucDaoTao: ['', Validators.required],
      CoSoDaoTao: ['', Validators.required],
      fileBase64: [null],
      action: [1, Validators.required]
    })

  }



  onFromSubmit() {
    if (this.empForm.valid) {
      const formData = this.empForm.value;
      if (this.data) {
        console.log("TaiNguyen")
        console.log(formData)
        // Update logic
        this._empService.updateTrinhDoHocVan(this.data.id, formData).subscribe({
          next: (val: any) => {
            alert('Cập nhật thành công');
            this.ref.close();
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        // Add logic
        this._empService.addTrinhDoHocVan(this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Thêm mới thành công');
            this.ref.close();
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }

  getFileName(filePath: string): string {
    return filePath.split('\\').pop() || filePath.split('/').pop() || filePath;
  }

  ngOnInit(): void {
    if (this.data) {
      this.empForm.patchValue(this.data);
      this.inputdata = { title: 'Cập nhập Trình Độ Học Vấn' }; // Cập nhập title khi có data
      this.selectedFileName = this.getFileName(this.data.fileBase64);
    } else {
      this.inputdata = { title: 'Thêm Trình Độ Học Vấn' }; // Thêm title khi không có data
    }

  }

  

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.empForm.patchValue({
          fileBase64: reader.result
        });
      };
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
