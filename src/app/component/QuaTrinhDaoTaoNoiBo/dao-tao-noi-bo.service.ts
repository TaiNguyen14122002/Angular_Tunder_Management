import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DaoTaoNoiBoService {

  
  private apiUrl = 'http://localhost:3000/QuaTrinhDaoTaoNoiBo';
  private currentId: number; // Khởi tạo ID bắt đầu từ 1

  constructor(private _http: HttpClient) {
    this.currentId = Number(localStorage.getItem("currentId")) || 1;
   }

  getNextId(): number {
    const nextId = this.currentId++;
    localStorage.setItem('currentId', String(this.currentId));
    return nextId;
  }

  getQuaTrinhDaoTaoNoiBo(): Observable<any> {
    return this._http.get<any>(this.apiUrl);
  }

  addQuaTrinhDaoTaoNoiBo(data:any): Observable<any>{
    data.id = this.getNextId(); // Gán ID tự động tăng
    return this._http.post('http://localhost:3000/QuaTrinhDaoTaoNoiBo', data);
  }


  updateQuaTrinhDaoTaoNoiBo(id: number, updatedData: any): Observable<any> {
    return this._http.patch(`${this.apiUrl}/${id}`, updatedData);
  }
}
