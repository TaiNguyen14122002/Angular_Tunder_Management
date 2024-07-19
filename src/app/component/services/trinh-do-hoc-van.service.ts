import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrinhDoHocVanService {
  
  private apiUrl = ' http://localhost:3000/TrinhDoHocVan';
  private currentId: number; // Khởi tạo ID bắt đầu từ 1
  public refreshDataSubject: Subject<void>; // Subject for refreshing data

  constructor(private _http: HttpClient) {
    this.currentId = Number(localStorage.getItem("currentId")) || 1;
    this.refreshDataSubject = new Subject<void>(); // Initialize refreshDataSubject
   }

  getNextId(): number {
    const nextId = this.currentId++;
    localStorage.setItem('currentId', String(this.currentId));
    return nextId;
  }

  addTrinhDoHocVan(data:any): Observable<any>{
    data.id = this.getNextId(); // Gán ID tự động tăng
    return this._http.post(' http://localhost:3000/TrinhDoHocVan', data);
  }

  updateTrinhDoHocVan(id: number, data: any): Observable<any> {
    return this._http.patch(`${this.apiUrl}/${id}`, data);
  }

  

  getTrinhDoHocVan(): Observable<any> {
    return this._http.get<any>(this.apiUrl);
  }

  deleteTrinhDoHocVan(id: number, updatedData: any): Observable<any> {
    return this._http.patch(`${this.apiUrl}/${id}`, updatedData);
  }
}
