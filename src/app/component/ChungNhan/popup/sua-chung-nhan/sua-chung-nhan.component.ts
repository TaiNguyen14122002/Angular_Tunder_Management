import { Component, Inject, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
import { ChungNhanService } from '../../Services/chung-nhan.service';

@Component({
  selector: 'app-sua-chung-nhan',
  templateUrl: './sua-chung-nhan.component.html',
  styleUrls: ['./sua-chung-nhan.component.css']
})
export class SuaChungNhanComponent{

  inputdata: any = { title: '' };
  editdata: any;
  empForm: FormGroup;
  closemessage = 'closed using directive'
  selectedFileBase64: string | null = null;
  selectedFileName: string | null = null;


  constructor(
    private ref: MatDialogRef<SuaChungNhanComponent>, private buildr: FormBuilder,
    
    private _fb: FormBuilder,
    private _empService: ChungNhanService,
    private _dialoogRef: MatDialogRef<SuaChungNhanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      TenNhanVien: '',
      VanBangChungChi: '',
      LoaiChungChi: '',
      LinhVucChungChi:'',
      ChungChiQuocTe: [false],
      MucChungChi: '',
      FileDinhKem: [null],
      CoSoDaoTao: '',
      DiaDiemDaoTao:'',
      CuDiHoc: [false],
      Diem: '',
      KetQuaXepLoai:'',
      TuNgay: '',
      DenNgay: '',
      NgayCapChungChi: '',
      action: 1
    })

  }

  onFromSubmit() {
    if (this.empForm.valid) {
      const formData = this.empForm.value;
      if (this.data) {
        console.log("TaiNguyen")
        console.log(formData)
        // Update logic
        this._empService.updateChungNhanChungChi(this.data.id, formData).subscribe({
          next: (val: any) => {
            alert('Cập nhật thành công');
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
      this.selectedFileName = this.getFileName(this.data.FileDinhKem);
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
          FileDinhKem: reader.result
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
