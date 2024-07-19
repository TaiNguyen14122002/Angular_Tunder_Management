import { Component, Inject, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, } from '@angular/forms';
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

import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';

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

  minEndDate: Date | null = null;
  searchControl = new FormControl();
  searchControlKetQua: FormControl = new FormControl();
  searchControlLinhVuc: FormControl = new FormControl();
  searchControlLoaiLinhVuc: FormControl = new FormControl();
  filteredOptions: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  filteredOptionsKetQua: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  FilteredOptionsLinhVuc: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  FillteredOptionsLoaiLinhVuc: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
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

  KetQuaXepLoaiOptions: string[] = [
    "Xuất sắc",
    "Giỏi",
    "Khá",
    "Trung bình",
    "Yếu",
    "Kém"
  ];

  LinhVucChungChiOptions: string[] = [
    "Công nghệ thông tin",
    "Kinh doanh và quản lý",
    "Ngôn ngữ và văn hóa",
    "Y tế và sức khỏe",
    "Nghệ thuật và thiết kế",
    "Kỹ thuật và công nghệ",
    "Pháp luật và luật pháp",
    "Giáo dục và đào tạo",
    "Thể thao và giải trí",
    "Khoa học tự nhiên"
  ];

  LoaiLinhVucOptions: string[] = [
    "Kỹ năng mềm",
    "Chứng chỉ IT",
    "Chứng chỉ tiếng Anh",
    "Chứng chỉ quản lý dự án",
    "Chứng chỉ marketing",
    "Chứng chỉ kế toán",
    "Chứng chỉ ngoại ngữ",
    "Chứng chỉ phát triển phần mềm",
    "Chứng chỉ thiết kế đồ họa",
    "Chứng chỉ y tế",
    "Chứng chỉ nhân sự"
  ]


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
    console.log(this.data);
    this.empForm.patchValue(this.data)

    // Lọc tùy chọn khi tìm kiếm
    this.searchControl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterOptions();
    });

    this.searchControlKetQua.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterOptionsKetQua();
    });

    this.searchControlLinhVuc.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterOptionsLinhVuc();
    });

    this.searchControlLoaiLinhVuc.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterOptionsLoaiLinhVuc();
    });

    
    this._empService.getChungNhanChungChi().subscribe(data => {
      console.log('Dữ liệu từ API:', data);
      this.filteredOptions.next(this.diaDiemDaoTaoOptions.slice());
      this.filteredOptionsKetQua.next(this.KetQuaXepLoaiOptions.slice());
      this.FilteredOptionsLinhVuc.next(this.LinhVucChungChiOptions.slice());
      this.FillteredOptionsLoaiLinhVuc.next(this.LoaiLinhVucOptions.slice());
    });

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

  DateFilter = (d: Date | null): boolean => {
    if (!d || !this.minEndDate) {
      return true;
    }
    return d <= this.minEndDate;
  }


  certificateDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const certificateDate = control.value;
    const creationDate = this.empForm.get('TuNgay')?.value;
    if (certificateDate && creationDate && new Date(certificateDate) > new Date(creationDate)) {
      return { certificateDate: true };
    }
    return null;
  }


  //Loc tim kiem Dia Diem Dao Tao
  private filterOptions() {
    const search = this.searchControl.value ? this.searchControl.value.toLowerCase() : '';
    this.filteredOptions.next(
      this.diaDiemDaoTaoOptions.filter(option => option.toLowerCase().includes(search))
    );
  }

  private filterOptionsKetQua() {
    const search = this.searchControlKetQua.value ? this.searchControlKetQua.value.toLowerCase() : '';
    this.filteredOptionsKetQua.next(
      this.KetQuaXepLoaiOptions.filter(option => option.toLowerCase().includes(search))
    );
  }

  private filterOptionsLinhVuc() {
    const search = this.searchControlLinhVuc.value ? this.searchControlLinhVuc.value.toLowerCase() : '';
    this.FilteredOptionsLinhVuc.next(
      this.LinhVucChungChiOptions.filter(option => option.toLowerCase().includes(search))
    );
  }

  private filterOptionsLoaiLinhVuc() {
    const search = this.searchControlLoaiLinhVuc.value ? this.searchControlLoaiLinhVuc.value.toLowerCase() : '';
    this.FillteredOptionsLoaiLinhVuc.next(
      this.LoaiLinhVucOptions.filter(option => option.toLowerCase().includes(search))
    );
  }

}
