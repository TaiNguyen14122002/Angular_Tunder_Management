import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarComponent } from './component/menubar/menubar.component';
import { HomeComponent } from './component/home/home.component';
import { TableComponent } from './component/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './component/popup/popup.component';
import { UserdetailComponent } from './component/userdetail/userdetail.component';
import { TableChungNhanComponent } from './component/ChungNhan/table-chung-nhan/table-chung-nhan.component';
import { CapNhapComponent } from './component/popup/cap-nhap/cap-nhap.component';
import { ThemChungNhanComponent } from './component/ChungNhan/popup/them-chung-nhan/them-chung-nhan.component';
import { SuaChungNhanComponent } from './component/ChungNhan/popup/sua-chung-nhan/sua-chung-nhan.component';
import { ChiTietTrinhDoHVComponent } from './component/popup/chi-tiet-trinh-do-hv/chi-tiet-trinh-do-hv.component';
import { ChiTietChungNhanComponent } from './component/ChungNhan/popup/chi-tiet-chung-nhan/chi-tiet-chung-nhan.component';
import { TableQuaTrinhCongTacComponent } from './component/QuaTrinhCongTac/table-qua-trinh-cong-tac/table-qua-trinh-cong-tac.component';
import { ChiTietQuaTrinhCongTacComponent } from './component/QuaTrinhCongTac/popup/chi-tiet-qua-trinh-cong-tac/chi-tiet-qua-trinh-cong-tac.component';
import { SuaQuaTrinhCongTacComponent } from './component/QuaTrinhCongTac/popup/sua-qua-trinh-cong-tac/sua-qua-trinh-cong-tac.component';
import { ThemQuaTrinhCongTacComponent } from './component/QuaTrinhCongTac/popup/them-qua-trinh-cong-tac/them-qua-trinh-cong-tac.component';
import { ThamGiaDuAnComponent } from './component/QuaTrinhThamGiaDuAn/tham-gia-du-an/tham-gia-du-an.component';
import { ThemThamGiaDuAnComponent } from './component/QuaTrinhThamGiaDuAn/popup/them-tham-gia-du-an/them-tham-gia-du-an.component';
import { SuaThamGiaDuAnComponent } from './component/QuaTrinhThamGiaDuAn/popup/sua-tham-gia-du-an/sua-tham-gia-du-an.component';
import { ChiTietThamGiaDuAnComponent } from './component/QuaTrinhThamGiaDuAn/popup/chi-tiet-tham-gia-du-an/chi-tiet-tham-gia-du-an.component';
import { TableDaoTaoNoiBoComponent } from './component/QuaTrinhDaoTaoNoiBo/table-dao-tao-noi-bo/table-dao-tao-noi-bo.component';
import { ChiTietDaoTaoNoiBoComponent } from './component/QuaTrinhDaoTaoNoiBo/chi-tiet-dao-tao-noi-bo/chi-tiet-dao-tao-noi-bo.component';
import { SuaDaoTaoNoiBoComponent } from './component/QuaTrinhDaoTaoNoiBo/sua-dao-tao-noi-bo/sua-dao-tao-noi-bo.component';
import { ThemDaoTaoNoiBoComponent } from './component/QuaTrinhDaoTaoNoiBo/them-dao-tao-noi-bo/them-dao-tao-noi-bo.component';
import { InfoDetailComponent } from './component/info-detail/info-detail.component';




@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    HomeComponent,
    TableComponent,
    PopupComponent,
    UserdetailComponent,
    TableChungNhanComponent,
    CapNhapComponent,
    ThemChungNhanComponent,
    SuaChungNhanComponent,
    ChiTietTrinhDoHVComponent,
    ChiTietChungNhanComponent,
    TableQuaTrinhCongTacComponent,
    ChiTietQuaTrinhCongTacComponent,
    SuaQuaTrinhCongTacComponent,
    ThemQuaTrinhCongTacComponent,
    ThamGiaDuAnComponent,
    ThemThamGiaDuAnComponent,
    SuaThamGiaDuAnComponent,
    ChiTietThamGiaDuAnComponent,
    TableDaoTaoNoiBoComponent,
    ChiTietDaoTaoNoiBoComponent,
    SuaDaoTaoNoiBoComponent,
    ThemDaoTaoNoiBoComponent,
    InfoDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
