import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuaTrinhCongTacService {

  private apiUrl = ' https://974ef8e41625c685db6795abea8f451d.serveo.net/QuaTrinhCongTac';
  private currentId: number; // Khởi tạo ID bắt đầu từ 1

  constructor(private _http: HttpClient) {
    this.currentId = Number(localStorage.getItem("currentId")) || 1;
   }

  getNextId(): number {
    const nextId = this.currentId++;
    localStorage.setItem('currentId', String(this.currentId));
    return nextId;
  }

  getQuaTrinhCongTac(): Observable<any> {
    return this._http.get<any>(this.apiUrl);
  }

  addQuaTrinhCongTac(data:any): Observable<any>{
    data.id = this.getNextId(); // Gán ID tự động tăng
    return this._http.post(' https://974ef8e41625c685db6795abea8f451d.serveo.net/QuaTrinhCongTac', data);
  }


  updateQuaTrinhCongTac(id: number, updatedData: any): Observable<any> {
    return this._http.patch(`${this.apiUrl}/${id}`, updatedData);
  }

}
