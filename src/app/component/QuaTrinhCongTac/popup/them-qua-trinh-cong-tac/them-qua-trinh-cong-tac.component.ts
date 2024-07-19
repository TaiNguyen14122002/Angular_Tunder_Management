import { Component, Inject, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
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
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


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
  minEndDate: Date | null = null;
  searchControlKhoaDaoTao: FormControl = new FormControl();
  searchControlDonViDaoTao: FormControl = new FormControl();
  seatchControlHinhThucDaoTao: FormControl = new FormControl();
  searchControlTrangThaiDaoTao: FormControl = new FormControl();
  filteredOptionsKhoaDaoTao: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  fillteredOptionsDonViDaoTao: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  fillteredOptionsHinhThucDaoTao: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);
  fillteredOptionsTrangThaiDaoTao: ReplaySubject<string[]> = new ReplaySubject<string[]>(1);

  protected _onDestroy = new Subject<void>();
  

  KhoaDaoTao: string[] = ['Khoá A', 'Khoá B', 'Khoá C', 'Khoá D'];
  DonViDaoTao: string[] = ['VNPT', 'FPT', 'Viettel', 'Mobifone'];
  HinhThucDaoTao: string[] = ['Trực tiếp', 'Trực tuyến', 'Kết hợp'];
  TrangThaiDaoTao: string[] = ['Đang học', 'Đã hoàn thành', 'Bị gián đoạn'];


  constructor(
    private ref: MatDialogRef<ThemQuaTrinhCongTacComponent>, private buildr: FormBuilder,
    
    private _fb: FormBuilder,
    private _empService: QuaTrinhCongTacService,
    private _dialoogRef: MatDialogRef<ThemQuaTrinhCongTacComponent>,
    
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      TenNhanVien: ['', Validators.required],
      DonVi: ['', Validators.required],
      ChucDanh: ['', Validators.required],
      KhoaDaoTao:['', Validators.required],
      HinhThucToChuc: ['', Validators.required],
      // DonViToChuc: ['', Validators.required],
      DonViDaoTao: ['', Validators.required],
      DiemSo: ['', [Validators.required, Validators.min(10), Validators.max(100), Validators.pattern(/^\d+(\.\d+)?$/)]],
      KetQuaKhoaDaoTao:['', Validators.required],
      // DuocCapChungChi: [false],
      TrongNganh: [false],
      ChiPhiDaoTao: ['', Validators.required],
      TrangThai: ['', Validators.required],
      // KiHopDongDaoTao: [false],
      // NoiDungCamKet: ['', Validators.required],
      TuNgay: ['', Validators.required],
      DenNgay: ['', Validators.required],
      KetQuaCacMon: ['', Validators.required],
      MoTa: ['', Validators.required],
      action: 1
    })

  }

  onFromSubmit() {
    console.log("tAI")
    if (this.empForm.valid) {
      console.log("tAItAI")
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

    this.searchControlKhoaDaoTao.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.FilteredOptionsKhoaDaoTao();
    });

    this.searchControlDonViDaoTao.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.FillteredOptionsDonViDaoTao();
    });

    this.seatchControlHinhThucDaoTao.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.FillteredOptionsHinhThucDaoTao();
    });

    this.searchControlTrangThaiDaoTao.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.FillteredOptionsTrangThaiDaoTao();
    })

    this.filteredOptionsKhoaDaoTao.next(this.KhoaDaoTao.slice());

    this.fillteredOptionsDonViDaoTao.next(this.DonViDaoTao.slice());

    this.fillteredOptionsHinhThucDaoTao.next(this.HinhThucDaoTao.slice());

    this.fillteredOptionsTrangThaiDaoTao.next(this.TrangThaiDaoTao.slice());

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

  //Loc tim kiem khoa dao tao
  private FilteredOptionsKhoaDaoTao() {
    const search = this.searchControlKhoaDaoTao.value ? this.searchControlKhoaDaoTao.value.toLowerCase() : '';
    this.filteredOptionsKhoaDaoTao.next(
      this.KhoaDaoTao.filter(option => option.toLowerCase().includes(search))
    );
  }
  
  private FillteredOptionsDonViDaoTao() {
    const search = this.searchControlDonViDaoTao.value ? this.searchControlDonViDaoTao.value.toLowerCase() : '';
    this.fillteredOptionsDonViDaoTao.next(
      this.DonViDaoTao.filter(option => option.toLowerCase().includes(search))
    );
  }
  
  private FillteredOptionsHinhThucDaoTao() {
    const search = this.seatchControlHinhThucDaoTao.value ? this.seatchControlHinhThucDaoTao.value.toLowerCase() : '';
    this.fillteredOptionsHinhThucDaoTao.next(
      this.HinhThucDaoTao.filter(option => option.toLowerCase().includes(search))
    );
  }

  
  private FillteredOptionsTrangThaiDaoTao() {
    const search = this.searchControlTrangThaiDaoTao.value ? this.searchControlTrangThaiDaoTao.value.toLowerCase() : '';
    this.fillteredOptionsTrangThaiDaoTao.next(
      this.TrangThaiDaoTao.filter(option => option.toLowerCase().includes(search))
    );
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



}
