import { Component, Inject, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { take, takeUntil } from 'rxjs/operators';



import { HttpClient } from '@angular/common/http';
import { TrinhDoHocVanService } from '../services/trinh-do-hoc-van.service';
import { ReplaySubject, Subject } from 'rxjs';




@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  inputdata: any = { title: '' };
  editdata: any;
  empForm: FormGroup;
  closemessage = 'closed using directive'
  selectedFileBase64: string | null = null;
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
    private ref: MatDialogRef<PopupComponent>, private buildr: FormBuilder,
    private dateAdapter: DateAdapter<any>,
    private _fb: FormBuilder,
    private _empService: TrinhDoHocVanService,
    private _dialoogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dateAdapter.setLocale('vi-VN'); // Set locale for datepicker to Vietnamese format
    this.empForm = this._fb.group({
      TuNgay: ['', Validators.required],
      DenNgay: ['', Validators.required],
      TrinhDoDaoTao: ['', Validators.required],
      ChuyenNganhDaoTao: ['', Validators.required],
      NganhDaoTao: ['', Validators.required],
      HinhThucDaoTao: ['', Validators.required],
      CoSoDaoTao: ['', Validators.required],
      fileBase64: [null],
      action: 1
    })

  }
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }


  onFromSubmit() {
    if (this.empForm.valid) {
      this._empService.addTrinhDoHocVan(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('TrinhDoHocVan added successflly');
          this._dialoogRef.close();
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }
  }

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

    this.fillteredOptionsLoaiLinhVuc.next(this.LoaiLinhVuc.slice());

    this.fillteredOptionsChuyenNganh.next(this.ChuyenNganh.slice());

    this.fillteredOptionsNganhDaoTao.next(this.NganhDaoTao.slice());

    this.filleredOptionsHinThucDaoTao.next(this.HinhThucDaoTao.slice());

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
