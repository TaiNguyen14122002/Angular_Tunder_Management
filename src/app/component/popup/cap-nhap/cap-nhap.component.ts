import { Component, Inject, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
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
import { TrinhDoHocVanService } from '../../services/trinh-do-hoc-van.service';

import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

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
  minEndDate: Date | null = null;
  searchOptionsLoaiLinhVuc: FormControl = new FormControl();
  searchOptionsChuyenNganh: FormControl = new FormControl();
  searchOptionsNganhDaoTao: FormControl = new FormControl();
  searchOptionsHinhThucDaoTao: FormControl = new FormControl();
  fillteredOptionsLoaiLinhVuc: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  fillteredOptionsChuyenNganh: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  fillteredOptionsNganhDaoTao: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  filleredOptionsHinThucDaoTao: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

  protected _onDestroy = new Subject<void>();

  LoaiLinhVuc: string[] = ['Cao đẳng', 'Đại học', 'Thạc sĩ', 'Tiến sĩ'];
  ChuyenNganh: string[] = ['Khoa học Máy tính', 'Kỹ thuật phần mềm', 'An toàn thông tin', 'Mạng máy tính', 'Công nghệ thông tin', 'Quản trị Kinh doanh', 'Kinh tế'];
  NganhDaoTao: string[] = ['Công nghệ thông tin', 'Kinh tế', 'Quản trị Kinh doanh', 'Ngôn ngữ Anh', 'Khoa học Máy tính', 'Kỹ thuật phần mềm', 'Kinh tế'];
  HinhThucDaoTao: string[] = ['Chính Quy', 'Văn bằng 2', 'Văn bằng 2 chất lượng cao', 'Văn bằng 2 liên thông', 'Tại chức', 'Từ xa'];
  


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
    console.log(this.data);
    this.empForm.patchValue(this.data)

    this.empForm.get('TuNgay')?.valueChanges.subscribe(() => {
      this.minEndDate = this.empForm.get('TuNgay')?.value;
      this.empForm.get('DenNgay')?.updateValueAndValidity();
    });

    this.searchOptionsLoaiLinhVuc.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.FilterOptionsLoaiLinhVuc();
    });

    this.searchOptionsChuyenNganh.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.FilterOptionsChuyenNganh();
    })

    this.searchOptionsNganhDaoTao.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.FilterOptionsNganhDaoTao();
    })

    this.searchOptionsHinhThucDaoTao.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.FilterOptionsHinhThucDaoTao();
    })
    console.log("tai",this.data)

    // Gọi API để lấy dữ liệu và gán vào form
  this._empService.getTrinhDoHocVan().subscribe(data => {
    console.log('Dữ liệu từ API:', data);
  

    this.fillteredOptionsLoaiLinhVuc.next(this.LoaiLinhVuc.slice());
    this.fillteredOptionsChuyenNganh.next(this.ChuyenNganh.slice());
    this.fillteredOptionsNganhDaoTao.next(this.NganhDaoTao.slice());
    this.filleredOptionsHinThucDaoTao.next(this.HinhThucDaoTao.slice());
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

  private FilterOptionsLoaiLinhVuc() {
    const search = this.searchOptionsLoaiLinhVuc.value ? this.searchOptionsLoaiLinhVuc.value.toLowerCase() : '';
    this.fillteredOptionsLoaiLinhVuc.next(
      this.LoaiLinhVuc.filter(option => option.toLowerCase().includes(search))
    );
  }
  
  private FilterOptionsChuyenNganh() {
    const search = this.searchOptionsChuyenNganh.value ? this.searchOptionsChuyenNganh.value.toLowerCase() : '';
    this.fillteredOptionsChuyenNganh.next(
      this.ChuyenNganh.filter(option => option.toLowerCase().includes(search))
    );
  }

  private FilterOptionsNganhDaoTao() {
    const search = this.searchOptionsNganhDaoTao.value ? this.searchOptionsNganhDaoTao.value.toLowerCase() : '';
    this.fillteredOptionsNganhDaoTao.next(
      this.NganhDaoTao.filter(option => option.toLowerCase().includes(search))
    );
  }
  
  private FilterOptionsHinhThucDaoTao() {
    const search = this.searchOptionsHinhThucDaoTao.value ? this.searchOptionsHinhThucDaoTao.value.toLowerCase() : '';
    this.filleredOptionsHinThucDaoTao.next(
      this.HinhThucDaoTao.filter(option => option.toLowerCase().includes(search))
    );
  }

}
