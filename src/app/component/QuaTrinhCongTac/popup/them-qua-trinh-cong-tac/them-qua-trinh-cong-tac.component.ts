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
import { QuaTrinhCongTacService } from '../../qua-trinh-cong-tac.service';


@Component({
  selector: 'app-them-qua-trinh-cong-tac',
  templateUrl: './them-qua-trinh-cong-tac.component.html',
  styleUrls: ['./them-qua-trinh-cong-tac.component.css']
})
export class ThemQuaTrinhCongTacComponent implements OnInit{

  inputdata: any = { title: '' };
  editdata: any;
  empForm: FormGroup;
  closemessage = 'closed using directive'
  selectedFileBase64: string | null = null;


  constructor(
    private ref: MatDialogRef<ThemQuaTrinhCongTacComponent>, private buildr: FormBuilder,
    
    private _fb: FormBuilder,
    private _empService: QuaTrinhCongTacService,
    private _dialoogRef: MatDialogRef<ThemQuaTrinhCongTacComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      TenNhanVien: '',
      DonVi: '',
      ChucDanh: '',
      KhoaDaoTao:'',
      HinhThucToChuc: '',
      DonViToChuc: '',
      DonViDaoTao: '',
      DiemSo: '',
      KetQuaKhoaDaoTao:'',
      DuocCapChungChi: [false],
      TrongNganh: [false],
      ChiPhiDaoTao: '',
      TrangThai: '',
      KiHopDongDaoTao: [false],
      NoiDungCamKet: '',
      TuNgay: '',
      DenNgay: '',
      KetQuaCacMon: '',
      MoTa: '',
      action: 1
    })

  }

  onFromSubmit() {
    if (this.empForm.valid) {
      // const formData = this.empForm.value;
      // if(this.selectedFileBase64){
      //   formData.fileBase64 = this.selectedFileBase64;
      // }
      this._empService.addQuaTrinhCongTac(this.empForm.value).subscribe({
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