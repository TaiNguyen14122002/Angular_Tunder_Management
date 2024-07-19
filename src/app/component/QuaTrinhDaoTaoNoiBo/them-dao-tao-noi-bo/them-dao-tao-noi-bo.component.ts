import { Component, Inject, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
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
import { DaoTaoNoiBoService } from '../dao-tao-noi-bo.service';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-them-dao-tao-noi-bo',
  templateUrl: './them-dao-tao-noi-bo.component.html',
  styleUrls: ['./them-dao-tao-noi-bo.component.css']
})
export class ThemDaoTaoNoiBoComponent implements OnInit {


  inputdata: any = { title: '' };
  editdata: any;
  empForm: FormGroup;
  closemessage = 'closed using directive'
  selectedFileBase64: string | null = null;
  minEndDate: Date | null = null;


  searchOptionsDonViDaoTaoNoiBo: FormControl = new FormControl();
  fillteredDonViDaoTaoNoiBo: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  protected _onDestroy = new Subject<void>();


  diaDiemDaoTaoOptions: string[] = [
    "Đại học Quốc gia Hà Nội",
    "Đại học Bách khoa Hà Nội",
    "Đại học Kinh tế Quốc dân",
    "Đại học Sư phạm Hà Nội",
    "Đại học Bách khoa TP.HCM",
    "Đại học Khoa học Tự nhiên TP.HCM",
    "Đại học Ngoại thương",
    "Đại học Y Hà Nội",
    "Đại học Y Dược Hà Nội",
    "Đại học Sân khấu Điện ảnh"
  ];


  constructor(
    private ref: MatDialogRef<ThemDaoTaoNoiBoComponent>, private buildr: FormBuilder,
    
    private _fb: FormBuilder,
    private _empService: DaoTaoNoiBoService,
    private _dialoogRef: MatDialogRef<ThemDaoTaoNoiBoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      TuNgay: ['', Validators.required],
      DenNgay: ['', Validators.required],
      TenKhoaDaoTao: ['', Validators.required],
      HinhThucToChuc: ['', Validators.required],
      DonViDaoTaoNoiBo: ['', Validators.required],
      DonViDaoTaoBenNgoai: ['', Validators.required],
      DuAnDaoTao: ['', Validators.required],
      action: 1
    })

  }

  onFromSubmit() {
    if (this.empForm.valid) {
      this._empService.addQuaTrinhDaoTaoNoiBo(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('Thêm quá trình đào tạo nội bộ thành công');
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
      this.empForm.get('NgayCapChungChi')?.updateValueAndValidity();
    });


    // Lọc tùy chọn khi tìm kiếm
    this.searchOptionsDonViDaoTaoNoiBo.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterOptions();
    });

    this.fillteredDonViDaoTaoNoiBo.next(this.diaDiemDaoTaoOptions.slice());

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

  //Loc tim kiem Dia Diem Dao Tao
  private filterOptions() {
    const search = this.searchOptionsDonViDaoTaoNoiBo.value ? this.searchOptionsDonViDaoTaoNoiBo.value.toLowerCase() : '';
    this.fillteredDonViDaoTaoNoiBo.next(
      this.diaDiemDaoTaoOptions.filter(option => option.toLowerCase().includes(search))
    );
  }

}
